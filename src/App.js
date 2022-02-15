import "./App.css";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [newMap, setNewMap] = useState(null);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    const url =
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function convertIntObj(data) {
    const res = {};
    for (const key in data) {
      res[key] = {};
      for (const prop in data[key]) {
        const parsed = parseInt(data[key][prop], 10);
        res[key][prop] = isNaN(parsed) ? data[key][prop] : parsed;
      }
    }
    return res;
  }
  var result = convertIntObj(data);

  var arrayResult = Object.values(result);

  const handlePrice = e => {
    if (e.target.checked == true) {
      setNewMap(arrayResult.filter(d => d.price < e.target.value));
    } else {
      setNewMap(null);
    }
  };

  const types = arrayResult.map(d => d.product_type);
  const uniqueTypes = [...new Set(types)];

  const handleType = e => {
    if (e.target.checked == true) {
      setNewMap(arrayResult.filter(d => d.product_type == e.target.value));
    } else {
      setNewMap(null);
    }
  };

  const handleRating = e => {
    // console.log(e.target.value);
    console.log(arrayResult.filter(e => e.rating < e.target.value));
    if (e.target.rating == true) {
      // setNewMap(arrayResult.filter(d => d.rating < e.target.rating));
    } else {
      setNewMap(null);
    }
  };

  const uniquePrices = [5, 10, 20];
  const ratings = [0, 1, 2, 3, 4, 5];

  return (
    <div>
      <div>
        <div
          className={filter == true ? "dropdown" : "dropup"}
          onClick={() => setFilter(!filter)}
        ></div>
      </div>
      {filter == true && (
        <div>
          <div>
            Prices
            {uniqueTypes.map(k => (
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  value={k}
                  onChange={e => handleType(e)}
                />
                <div>{k}</div>
              </div>
            ))}
          </div>
          <div>
            Type
            {uniquePrices.map(d => (
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  value={d}
                  onChange={e => handlePrice(e)}
                />
                <div>Less than ${d}</div>
              </div>
            ))}
          </div>
          <div>
            Rating
            {ratings.map(r => (
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  value={r}
                  onChange={e => handleRating(e)}
                />
                <div>{r}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        {newMap !== null && (
          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            {newMap.map(d => (
              <div
                style={{
                  border: "solid 1px black",
                  display: "flex",
                  alignTtems: " center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "30%",
                  textAlign: "center",
                  minHeight: 200,
                  alignItems: "center",
                  padding: "1%",
                  marginBottom: 20,
                  marginRight: 5,
                  marginLeft: 5
                }}
              >
                <img src={d.image_link} alt="productImage"></img>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    minHeight: "50px"
                  }}
                >
                  {d.name}
                </div>
                <div>{d.price}</div>
                {d.rating > 0 ? (
                  <Rating initialValue={d.rating} size={22} readonly />
                ) : (
                  <div>
                    <Rating initialValue={0} size={22} readonly />
                    <div> No reveiws</div>
                  </div>
                )}
                <div className="viewMore" onClick={() => setModal(d)}>
                  View More
                </div>
              </div>
            ))}
          </div>
        )}
        {newMap == null && (
          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            {arrayResult.map(d => (
              <div
                style={{
                  border: "solid 1px black",
                  display: "flex",
                  alignTtems: " center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "30%",
                  textAlign: "center",
                  minHeight: 200,
                  alignItems: "center",
                  padding: "1%",
                  marginBottom: 20,
                  marginRight: 5,
                  marginLeft: 5
                }}
              >
                <img src={d.image_link} alt="productImage"></img>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    minHeight: "50px"
                  }}
                >
                  {d.name}
                </div>
                <div>{d.price}</div>
                {d.rating > 0 ? (
                  <Rating initialValue={d.rating} size={22} readonly />
                ) : (
                  <div>
                    <Rating initialValue={0} size={22} readonly />
                    <div> No reveiws</div>
                  </div>
                )}
                <div className="viewMore" onClick={() => setModal(d)}>
                  View More
                </div>
              </div>
            ))}
          </div>
        )}
        {modal !== null && (
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "#202020de",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div className="modal">
              <div className="modalImage">
                <img
                  style={{ borderRadius: 5 }}
                  src={modal.image_link}
                  alt="productImage"
                ></img>
              </div>
              <div
                style={{
                  display: "flex",
                  alignTtems: " center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  textAlign: "center",
                  minHeight: 200,
                  alignItems: "center",
                  padding: "1%",
                  marginBottom: 20,
                  marginRight: 5,
                  marginLeft: 5,
                  position: "relative"
                }}
              >
                <div className="modalPriceTitleContainer">
                  <div className="modalTitle">{modal.name}</div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="modalPrice">${modal.price}</div>
                    {modal.rating > 0 ? (
                      <Rating
                        initialValue={modal.rating}
                        size={22}
                        readonly
                        style={{ display: "flex", alignItems: "center" }}
                      />
                    ) : (
                      <div>
                        <Rating
                          initialValue={0}
                          size={22}
                          readonly
                          style={{ display: "flex", alignItems: "center" }}
                        />
                        <div> No reveiws</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modalDescription">{modal.description}</div>
                {modal.product_colors && (
                  <div
                    className="modalDesciption"
                    style={{
                      width: "60%",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column"
                    }}
                  >
                    {modal.product_colors.map(e => (
                      <div className="productColors">
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: `${e.hex_value}`
                          }}
                        ></div>
                        <div style={{ paddingLeft: 7, color: "white" }}>
                          {e.colour_name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div
                  style={{
                    color: "white",
                    position: "fixed",
                    right: 20,
                    top: 10,
                    cursor: "pointer",
                    position: "absolute",
                    top: 0,
                    right: 0
                  }}
                  onClick={() => setModal(null)}
                >
                  <span aria-hidden="true">&times;</span>
                </div>
                <div className="buyNowContainer">
                  <div
                    className="buyNow"
                    onClick={e => {
                      e.preventDefault();
                      window.open(`${modal.product_link}`, "_blank");
                    }}
                  >
                    Buy Now!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
