import Rating from "@/components/home/rating";
import Review from "@/components/home/review";
import getBreadcrumb from "@/lib/getBeadcrumb";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { Metadata, ResolvingMetadata } from "next";
import CategoryBreadcrumbs from "@/components/ui/category-breadcrumbs";
import getSession from "@/lib/getSession";

export async function generateStaticParams() {
  const products: IProduct[] = await fetch(
    `${process.env.API_URL}/api/products`,
    {
      next: { tags: ["product"] },
    }
  ).then((res) => res.json());

  return products.map((product) => ({
    prodId: product.productId,
  }));
}

type Props = {
  params: { prodId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const prodId = params.prodId;

  // fetch data
  const products: IProduct = await fetch(
    `${process.env.API_URL}/api/products/${prodId}`,
    {
      next: { tags: ["product"] },
    }
  ).then((res) => res.json());

  return {
    title: products.productName,
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

async function getData(productId: string) {
  const res = await fetch(`${process.env.API_URL}/api/products/${productId}`, {
    next: { tags: ["product"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { prodId: string } }) {
  const { prodId } = params;
  const product: IProduct = await getData(prodId);
  const breadcrumb = await getBreadcrumb(product.categoryId);

  const addToCart = async () => {
    "use server";
    const session = await getSession();
    if (!session) {
      redirect(`/api/auth/signin`);
    } else {
      const exists = await prisma.cart.findFirst({
        where: {
          userId: session.user.userId,
          productId: prodId,
        },
      });

      if (!exists) {
        await prisma.cart.create({
          data: {
            productId: prodId,
            userId: session.user.userId,
            quantity: 1,
          },
        });
      } else {
        await prisma.cart.update({
          where: {
            cartId: exists.cartId,
          },
          data: {
            quantity: exists.quantity + 1,
          },
        });
      }
    }
    revalidatePath("/cart");
    revalidateTag("cartNum");

    redirect(`/cart`);
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto space-y-4">
        <CategoryBreadcrumbs items={breadcrumb} />

        <Card className="border-none" shadow="sm">
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative md:col-span-4 col-span-full">
                {product.images.length > 0 ? (
                  <div className="relative aspect-square">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.images[0]}`}
                      fill
                      priority
                      className="rounded-lg object-cover"
                      sizes="300px"
                      alt={product.productName}
                    />
                  </div>
                ) : (
                  <div className="sm:w-[300px] w-screen aspect-square flex justify-center items-center bg-white dark:bg-gray-700">
                    <svg
                      className="w-16 h-16 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex flex-col h-full col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h1 className="text-large font-medium mt-2">
                      {product.productName}
                    </h1>
                    <h3 className="font-semibold">
                      {product.price.toLocaleString("vi-VN")}&nbsp;₫
                    </h3>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center md:justify-start">
                  <form action={addToCart} className="flex gap-4 flex-col">
                    <Input type="number" defaultValue="1" labelPlacement="outside" />
                    <Button type="submit" color="primary" variant="shadow">
                      Thêm vào giỏ hàng
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Mô tả sản phẩm</h3>
          </CardHeader>
          <CardBody>
            <p dangerouslySetInnerHTML={{ __html: product.description }} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Đánh giá</h3>
          </CardHeader>
          <CardBody>
            {/* <Review data={product.Review} />
            <Rating productId={prodId} /> */}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export const dynamicParams = false;
