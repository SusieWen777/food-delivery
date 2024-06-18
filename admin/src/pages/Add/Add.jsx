import { useState, useRef } from "react";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import "./Add.scss";
import { toast } from "react-toastify";

const originalData = {
  name: "",
  description: "",
  category: "Salad",
  price: "",
};

function Add() {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(null);
  const [data, setData] = useState(originalData);
  const imgUploadRef = useRef(null);

  const onChangeHandler = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(image);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    console.log(formData);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData(originalData);
        setImage(null);

        // to ensure that the image input is cleared
        if (imgUploadRef.current) {
          imgUploadRef.current.value = "";
        }

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="" />
            ) : (
              <MdCloudUpload className="upload-icon" />
            )}
          </label>
          <input
            ref={imgUploadRef}
            onChange={(e) => {
              if (e.target.files[0]) setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            name="image"
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-desc flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add;
