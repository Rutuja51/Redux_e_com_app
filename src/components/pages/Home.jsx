import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreament, increment } from "../../redux/counterSlice";
import { addToCart,deleteCart } from "../../redux/cartSlice";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

export default function Home() {
    let dispatch = useDispatch()  // trigger reducer actions
    let [product,setProduct]=useState([]);
    let getProducts=()=>{
        axios.get('https://dummyjson.com/products')
        .then((res)=>res.data)
        .then((finalRes=>{
             console.log(finalRes.products);
            setProduct(finalRes.products)
        }))
    }

    useEffect(()=>{
        getProducts()
    },[])
    return (
        <div>
            {/* <h1>Home</h1>
            <button className="p-3 bg-red-500" onClick={()=>{dispatch(increment())}}>Change Count</button>
            <button className="p-3 bg-blue-500" onClick={()=>{dispatch(decreament())}}>Change Count</button> */}

            <section className="py-10 px-10 ">
                <h1 className="text-3xl text-center font-bold mb-8">Our Products</h1>

                <div className="max-w-[1320] mx-auto grid grid-cols-4 gap-5 mt-5">
                {
                    product.map((item,index)=>{
                        return <ProductCard data={item} key={index}></ProductCard>
                    })
                }
                
                </div>
                <ToastContainer></ToastContainer>
            </section>
        </div>
    )
}

function ProductCard({data}){
    let {title,price,thumbnail,description,id} = data;
    let dispatch = useDispatch();  // to trigger action in reducer which presrent in slice

    let cartItems = useSelector((myStore)=>myStore.cartStore.cart); // Array[Objects]

    let checkTeminCart = cartItems.find((obj)=>obj.id===id)
    let addTocartItem=()=>{
        let cartObj = {
            id,
            title,
            price,
            img:thumbnail,
            description,
            qty:1
        }
        dispatch(addToCart( {cartObj} ));  // sending data to cart reducer where action to changing state is there
        toast.success("Item added into Cart")
        // console.log(cartObj)
    }

    let removeCart=()=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCart({ id }));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
       
        // toast.success("Item removed from Cart")
    }
    return(
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700">
  <div className="h-56 w-full">
    <a href="#">
      <img
        className="mx-auto h-full"
        src={thumbnail}
        alt=""
      />
    
    </a>
  </div>
  <div className="pt-6">
    <div className="mb-4 flex items-center justify-between gap-4">
      <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
        {" "}
        Up to 15% off{" "}
      </span>
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          data-tooltip-target="tooltip-quick-look-2"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only"> Quick look </span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth={2}
              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
            />
            <path
              stroke="currentColor"
              strokeWidth={2}
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
        <div
          id="tooltip-quick-look-2"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
          data-popper-placement="top"
          style={{
            position: "absolute",
            inset: "auto auto 0px 0px",
            margin: 0,
            transform: "translate3d(596px, -1910px, 0px)"
          }}
        >
          Quick look
          <div
            className="tooltip-arrow"
            data-popper-arrow=""
            style={{
              position: "absolute",
              left: 0,
              transform: "translate3d(43.3333px, 0px, 0px)"
            }}
          />
        </div>
        <button
          type="button"
          data-tooltip-target="tooltip-add-to-favorites-2"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only"> Add to Favorites </span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
            />
          </svg>
        </button>
        <div
          id="tooltip-add-to-favorites-2"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
          data-popper-placement="top"
          style={{
            position: "absolute",
            inset: "auto auto 0px 0px",
            margin: 0,
            transform: "translate3d(612px, -1910px, 0px)"
          }}
        >
          Add to favorites
          <div
            className="tooltip-arrow"
            data-popper-arrow=""
            style={{
              position: "absolute",
              left: 0,
              transform: "translate3d(67.3333px, 0px, 0px)"
            }}
          />
        </div>
      </div>
    </div>
    <a
      href="#"
      className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
    >
      {title}
    </a>
    <div className="mt-2 flex items-center gap-2">
      <div className="flex items-center">
        <svg
          className="h-4 w-4 text-yellow-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
        </svg>
        <svg
          className="h-4 w-4 text-yellow-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
        </svg>
        <svg
          className="h-4 w-4 text-yellow-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
        </svg>
        <svg
          className="h-4 w-4 text-yellow-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
        </svg>
        <svg
          className="h-4 w-4 text-yellow-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-900 dark:text-white">4.9</p>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        (1,233)
      </p>
    </div>
    <ul className="mt-2 flex items-center gap-4">
      <li className="flex items-center gap-2">
        <svg
          className="h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
          />
        </svg>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Best Seller
        </p>
      </li>
      <li className="flex items-center gap-2">
        <svg
          className="h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2}
            d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Best Price
        </p>
      </li>
    </ul>
    <div className="mt-4 flex items-center justify-between gap-4">
      <p className="text-2xl font-extrabold leading-tight text-gray-900">
       $ {price}
      </p>
      {
        checkTeminCart ? 
        <button onClick={removeCart}
        type="button"
        className="inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border text-white"
      >
        <svg
          className="-ms-2 me-2 h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
          />
        </svg>
       Remove
      </button> :
      <button onClick={addTocartItem}
        type="button"
        className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:ring-1 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border"
      >
        <svg
          className="-ms-2 me-2 h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
          />
        </svg>
        Add to cart
      </button>
      }
      
    </div>
  </div>
</div>




    )
}