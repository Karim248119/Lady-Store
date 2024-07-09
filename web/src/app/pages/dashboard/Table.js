import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function Content({ products, handleDelete, handleEdit }) {
  return (
    <Table className="m-auto rounded-3xl overflow-hidden">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow className="bg-pink h-28 hover:bg-pink text-center ">
          <TableHead className=" text-black font-bold text-xl text-center ">
            name
          </TableHead>
          <TableHead className=" text-black font-bold text-xl text-center">
            price
          </TableHead>
          <TableHead className=" text-black font-bold text-xl text-center">
            description
          </TableHead>
          <TableHead className=" text-black font-bold text-xl text-center">
            category
          </TableHead>
          <TableHead className=" text-black font-bold text-xl text-center">
            Image
          </TableHead>

          <TableHead className=" text-black font-bold text-xl text-center">
            buttons
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products &&
          products.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium bg-black text-white text-center">
                  {product.name}
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  {product.price}
                </TableCell>
                <TableCell className="bg-black text-white text-center w-[25%] text-wrap">
                  {product.description}{" "}
                </TableCell>
                {product.category && (
                  <TableCell className="bg-black text-white text-center">
                    {product.category}{" "}
                  </TableCell>
                )}
                {product.imgs && (
                  <TableCell className="bg-black text-center ">
                    <div
                      // style={{
                      //   backgroundImage: `url(${product.imgs[0]})`,
                      // }}
                      className=" w-full h-full justify-center flex"
                    >
                      <img src={product.imgs[0]} className=" h-24 rounded-lg" />
                    </div>
                  </TableCell>
                )}
                {/* {product.colors && (
                  <TableCell className="bg-black">
                    {product.colors.map((color, i) => (
                      <div
                        key={i}
                        style={{ backgroundColor: color }}
                        className=" h-8 w-8 rounded-full"
                      />
                    ))}
                  </TableCell>
                )} */}

                <TableCell className="bg-black text-center  ">
                  <div className=" m-auto">
                    <Button
                      className="bg-white mx-5 text-pink"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-pink hover:text-pink"
                      onClick={() => handleDelete(product.id)}
                    >
                      delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
