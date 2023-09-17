import Link from "next/link";

async function getData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({
  params,
}: {
  params: { catgId: string; subcatgId: string };
}) {
  const data = await getData(
    `${process.env.BASE_URL}/api/catgs/${params.catgId}}/subcatgs/${params.subcatgId}}/sub-subcatgs`
  );

  return (
    <div>
      <ul>
        {data?.map((item: any) => {
          return (
            <li key={item.subcategory_id}>
              <Link
                href={`/dashboard/manage-categories/${item.subcategory_id}`}
              >
                {item.subcategory_name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
