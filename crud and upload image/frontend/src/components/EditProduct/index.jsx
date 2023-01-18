import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../config/api";

const EditProduct = () => {
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    try {
      const response = await axios.get(`${api.baseUrl}/products/${productId}`);
      const product = response.data;
      setName(product.name);
      setPreview(product.url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onLoadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);

    setPreview(URL.createObjectURL(image));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    console.log(file);
    console.log(formData);
    try {
      await axios.put(`${api.baseUrl}/products/${productId}`, formData);

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container py-4">
        <h1 className="text-center mb-4">Form Edit Product</h1>

        <div className="row justify-content-center">
          <div className="col-sm-8 col-lg-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="file">Product Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      name="file"
                      onChange={onLoadImage}
                    />

                    {preview && (
                      <figure
                        className="img-thumbnail my-3"
                        style={{ width: 300 }}
                      >
                        <img src={preview} alt="preview" className="w-100" />
                      </figure>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>

            <Link to={"/"} className="btn btn-sm btn-info my-5">
              &laquo; Go to product list
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
