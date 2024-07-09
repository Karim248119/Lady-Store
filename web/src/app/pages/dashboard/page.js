"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Content from "./Table";
import db from "@/config/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Add from "./Add";
import Header from "./Header";
import Edit from "./Edit";

export default function Dashboard() {
  const [products, setProducts] = useState();
  const [selectedproduct, setSelectedproduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        icon: "warning",
        color: "#F63A52",

        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      })
      .then((result) => {
        if (result.value) {
          const [product] = products.filter((product) => product.id === id);

          deleteDoc(doc(db, "products", id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `${product.firstName} ${product.lastName}'s data has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });

          const productsCopy = products.filter((product) => product.id !== id);
          setProducts(productsCopy);
        }
      });
  };
  const handleEdit = (id) => {
    const [product] = products.filter((product) => product.id === id);
    setSelectedproduct(product);
    setIsEditing(true);
  };
  return (
    <div>
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />
          <div className=" p-24">
            <Content
              products={products}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        </>
      )}

      {isAdding && (
        <Add
          products={products}
          setIsAdding={setIsAdding}
          setProducts={setProducts}
          getProducts={getProducts}
        />
      )}
      {isEditing && (
        <Edit
          products={products}
          selectedproduct={selectedproduct}
          setProducts={setProducts}
          setIsEditing={setIsEditing}
          getProducts={getProducts}
        />
      )}
    </div>
  );
}
