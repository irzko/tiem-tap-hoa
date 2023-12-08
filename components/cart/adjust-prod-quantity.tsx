import { adjustProductQuantity } from "@/lib/actions";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function AdjustProdQuantity({
  cartId,
  quantity,
  stockQuantity,
}: {
  cartId: string;
  quantity: number;
  stockQuantity: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [quantityValue, setQuantityValue] = useState("");
  useEffect(() => {
    setQuantityValue(quantity.toString());
  }, [quantity]);

  const handleDecrease = () => {
    if (quantity > 1) {
      adjustProductQuantity(cartId, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < stockQuantity) {
      adjustProductQuantity(cartId, quantity + 1);
    }
  };

  const handleBlur = () => {
    if (quantityValue === "") {
      adjustProductQuantity(cartId, 1);
      setQuantityValue("1");
    } else if (parseInt(quantityValue) < 1) {
      adjustProductQuantity(cartId, 1);
      setQuantityValue("1");
    } else if (parseInt(quantityValue) > stockQuantity) {
      adjustProductQuantity(cartId, stockQuantity);
      setQuantityValue(stockQuantity.toString());
    } else {
      adjustProductQuantity(cartId, parseInt(quantityValue));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = e.target.value;
    // if (parseInt(quantityValue) < 1 || quantityValue !== "-") {
    //   setQuantityValue("1");
    // }
    setQuantityValue(quantity);
  };

  return (
    <ButtonGroup>
      <Button isIconOnly onPress={handleDecrease}>
        <svg
          className="w-3.5 h-3.5 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </Button>
      <Input
        ref={inputRef}
        radius="none"
        type="number"
        id={cartId}
        labelPlacement="outside"
        min={1}
        form="adjust-quantity"
        onBlur={handleBlur}
        classNames={{
          inputWrapper: "w-14 px-2",
        }}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleBlur();
            inputRef.current?.blur();
          }
        }}
        value={quantityValue}
        required
      />
      <Button isIconOnly onPress={handleIncrease}>
        <svg
          className="w-3.5 h-3.5 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </Button>
    </ButtonGroup>
  );
}
