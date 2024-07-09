import React, { useState } from "react";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";

import db from "@/config/firestore";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Category } from "@/components/ui/Category";
import { Size } from "@/components/ui/Size";

export default function Edit({
  selectedproduct,
  products,
  getProducts,
  setProducts,
  setIsEditing,
}) {
  const [name, setName] = useState(selectedproduct.name);
  const [price, setPrice] = useState(selectedproduct.price);
  const [sale, setSale] = useState(selectedproduct.sale);
  const [description, setDescription] = useState(selectedproduct.description);
  const [category, setCategory] = useState(selectedproduct.category);
  const [imgsInput, setImgsInput] = useState("");
  const [imgs, setImgs] = useState(selectedproduct.imgs);
  const [colorInput, setColorInput] = useState("");
  const [colors, setColors] = useState(selectedproduct.colors);
  const [sizes, setSizes] = useState(selectedproduct.sizes);

  const id = selectedproduct.id;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const product = {
      name,
      price,
      sale,
      description,
      category,
      imgs,
      colors,
      sizes,
    };

    await setDoc(doc(db, "products", id), {
      ...product,
    });

    setProducts(products);
    setIsEditing(false);
    getProducts();

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleAddImgs = () => {
    if (imgsInput.length > 0) setImgs([...imgs, imgsInput]);
    setImgsInput("");
  };

  const handleDeleteImg = (index) => {
    Swal.fire({
      icon: "warning",
      color: "red",
      title: "Delete Image ?",
      text: "You won't be able to recover this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const updatedImgs = [...imgs];
        updatedImgs.splice(index, 1);
        setImgs(updatedImgs);
      }
    });
  };

  const handleAddColor = () => {
    if (colorInput.length > 0) setColors([...colors, colorInput]);
    setColorInput("");
  };

  const handleDeleteColor = (index) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Color ?",

      text: "You won't be able to recover this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const updatedColors = [...colors];
        updatedColors.splice(index, 1);
        setColors(updatedColors);
      }
    });
  };

  return (
    <div className="w-[60%] m-auto pt-32 min-h-screen  ">
      <form
        onSubmit={handleUpdate}
        className=" flex flex-col gap-8  bg-black p-10 pt-24 rounded-2xl relative"
      >
        <img
          src="../../pics/edit.png"
          className=" w-44 absolute -top-28 left-1/2 -translate-x-1/2"
        />

        <img
          src="../../pics/editCustomer.png"
          className=" h-[380px] absolute  -bottom-52 -right-96"
        />
        <img
          src="../../pics/Seller.png"
          className=" h-[380px] absolute  -bottom-52 -left-96"
        />
        <div className="flex flex-col gap-2">
          <Label className="text-pink" htmlFor="name">
            Product Name
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-pink" htmlFor="description">
            Description
          </Label>
          <Input
            id="description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 w-[45%]">
            <Label className="text-pink" htmlFor="price">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2  w-[45%]">
            <Label className="text-pink" htmlFor="sale">
              Sale
            </Label>
            <Input
              id="sale"
              type="number"
              name="sale"
              value={sale}
              onChange={(e) => setSale(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-between ">
          <div className="flex flex-col gap-2 w-[45%]">
            <Label className="text-pink" htmlFor="category">
              Category
            </Label>
            <Category category={category} setCategory={setCategory} />
          </div>

          <div className="flex flex-col gap-2 w-[45%]">
            <Label className="text-pink" htmlFor="sizes">
              Available Sizes
            </Label>
            <Size sizes={sizes} setSizes={setSizes} />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 w-[45%] ">
            <Label className="text-pink" htmlFor="imgs">
              Imags
            </Label>
            <div className="flex flex-row gap-3">
              <Input
                id="imgs"
                className=""
                type="text"
                name="imgs"
                value={imgsInput}
                onChange={(e) => setImgsInput(e.target.value)}
              />
              <Button
                className=" bg-pink"
                type="button"
                onClick={handleAddImgs}
              >
                Add
              </Button>
            </div>
            <div className=" flex flex-row gap-5">
              {imgs.length > 0 &&
                imgs.map((img, i) => (
                  <div key={i} onClick={() => handleDeleteImg(i)}>
                    <img
                      src={img}
                      className=" h-24 rounded-lg  border-pink"
                    ></img>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[45%]">
            <Label className="text-pink" htmlFor="colors">
              Colors
            </Label>
            <div className="flex flex-row gap-3  ">
              <Input
                id="colors"
                type="text"
                name="colors"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
              />
              <Button
                className="bg-pink"
                type="button"
                onClick={handleAddColor}
              >
                Add
              </Button>
            </div>
            <div className=" flex flex-row gap-5">
              {colors.length > 0 &&
                colors.map((color, i) => (
                  <div key={i} onClick={() => handleDeleteColor(i)}>
                    <div
                      className="w-10 h-10  border-pink rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            alignSelf: "center",
            gap: 50,
            display: "flex",
          }}
        >
          <Button type="submit" value="Add" className="scale-150 bg-pink">
            Submit
          </Button>
          <Button
            type="button"
            style={{ marginLeft: "12px" }}
            className="muted-button scale-150 bg-pink"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
