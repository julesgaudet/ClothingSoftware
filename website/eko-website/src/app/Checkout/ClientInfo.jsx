import React, { useState } from "react";

export default function ClientInfo({ clientInfo, setClientInfo }) {
  const [emailError, setEmailError] = useState("");
  const [zipError, setZipError] = useState("");

  //handle change qui marche pour chaque
  const handleChange = (e) => {
    const { name, value } = e.target;
    //prend l'état précédent et écrase seulement la valeur qui porte le nom de l'évenement
    setClientInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmailBlur = () => {
    const isValidEmail = /\S+@\S+\.\S+/.test(clientInfo.email);
    if (!isValidEmail) {
      setEmailError("Email invalide");
    } else {
      setEmailError("");
    }
  };

  const handleZipBlur = () => {
    const isValidZip = clientInfo.zip.length === 6;
    if (!isValidZip) {
      setZipError("Code postal invalide");
    } else {
      setZipError("");
    }
  };

  return (
    <>
      <h1 className="text-xl font-semibold my-6">Billing Information</h1>

      <form>
        <div className="flex-col w-full pr-24">
          <div className="flex-col my-5  space-y-2 w-full">
            <label className="font-medium">Name</label>
            <div className="flex w-full justify-between">
              <input
                className="p-3 w-[48.5%] border-2"
                type="text"
                name="name"
                value={clientInfo.name}
                onChange={handleChange}
                placeholder="First Name"
              />
              <input
                className="p-3 w-[48.5%] border-2"
                type="text"
                name="lastName"
                value={clientInfo.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="flex-col my-5 space-y-2">
            <label className="font-medium">Adress</label>
            <input
              className="p-3 w-full border-2"
              type="text"
              name="adress"
              value={clientInfo.adress}
              onChange={handleChange}
              placeholder="Ex: 123 Freedom Street"
            />
          </div>

          <div className="flex w-full justify-between my-5">
            <div className="flex-col w-[23%] space-y-2">
              {" "}
              <label className="font-medium">Country</label>
              <input
                className="p-3  w-full border-2"
                type="text"
                name="country"
                value={clientInfo.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
            <div className="flex-col w-[23%] space-y-2">
              {" "}
              <label className="font-medium">Region</label>
              <input
                className="p-3  w-full border-2"
                type="text"
                name="region"
                value={clientInfo.region}
                onChange={handleChange}
                placeholder="Region"
              />
            </div>
            <div className="flex-col w-[23%] space-y-2">
              {" "}
              <label className="font-medium">City</label>
              <input
                className="p-3 w-full border-2"
                type="text"
                name="city"
                value={clientInfo.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
            <div className="flex-col w-[23%] space-y-2">
              {" "}
              <label className="font-medium">Zip</label>
              <input
                className="p-3 w-full border-2"
                type="text"
                name="zip"
                value={clientInfo.zip}
                onChange={handleChange}
                onBlur={handleZipBlur}
                placeholder="Zip"
              />
              {zipError && <p className="error">{zipError}</p>}
            </div>
          </div>

          <div className="flex w-full justify-between my-5">
            <div className="flex-col w-[48.5%] space-y-2">
              <div>
                <label className="font-medium">Email</label>
              </div>

              <input
                className="p-3 w-full border-2"
                type="email"
                name="email"
                value={clientInfo.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                placeholder="Email"
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>

            <div className="flex-col w-[48.5%] space-y-2">
              <div>
                <label className="font-medium">Phone</label>
              </div>

              <input
                className="p-3 w-full border-2"
                type="text"
                name="phone"
                value={clientInfo.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="bg-white w-full border-2 flex-col px-5 py-3 mt-10 mb-5">
            <div className="border-b-2 py-3">
              <label className="font-semibold text-lg">Payment Option</label>
            </div>

            <div className="flex pb-4 pt-10">
              <div className="flex-col items-center justify-center w-1/3 p-10 border-r-2">
                <div className="flex items-center justify-center">
                  <label>Cash</label>
                </div>
                <div className="flex items-center justify-center">
                  <input
                    className="h-5 w-5"
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={clientInfo.payment === "cash"}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex-col items-center justify-center w-1/3 p-10 border-r-2">
                <div className="flex items-center justify-center">
                  <label>Paypal</label>
                </div>
                <div className="flex items-center justify-center">
                  <input
                    className="h-5 w-5"
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={clientInfo.payment === "paypal"}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex-col items-center justify-center w-1/3 p-10 ">
                <div className="flex items-center justify-center">
                  <label>Credit</label>
                </div>
                <div className="flex items-center justify-center">
                  <input
                    className="h-5 w-5"
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={clientInfo.payment === "credit"}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
