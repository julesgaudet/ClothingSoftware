import React, { useState } from "react";

function InputError({ error }) {
  if (error) {
    return <p className=" text-red-600 font-light">{error}</p>;
  }
}

export default function ClientInfo({
  clientInfo,
  setClientInfo,
  error,
  setError,
}) {
  //handle change qui marche pour chaque
  const handleChange = (e) => {
    const { name, value } = e.target;
    //prend l'état précédent et écrase seulement la valeur qui porte le nom de l'évenement
    setClientInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNameBlur = () => {
    const isValidName =
      /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/.test(
        clientInfo.name
      );
    setError((prevState) => ({
      ...prevState,
      name: isValidName ? "" : "Please enter a valid name",
    }));
  };

  const handleLastNameBlur = () => {
    const isValidLastName =
      /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/.test(
        clientInfo.lastName
      );
    setError((prevState) => ({
      ...prevState,
      lastName: isValidLastName ? "" : "Please enter a valid last name",
    }));
  };

  const handleAddressBlur = () => {
    const isValidAddress = /^[a-zA-Z0-9\s,'.#-]*$/.test(clientInfo.adress);
    setError((prevState) => ({
      ...prevState,
      address: isValidAddress ? "" : "Please enter a valid street address",
    }));
  };

  const handleCountryBlur = () => {
    const isValidCountry =
      /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/.test(
        clientInfo.country
      );
    setError((prevState) => ({
      ...prevState,
      country: isValidCountry ? "" : "Please enter a valid country",
    }));
  };

  const handleCityBlur = () => {
    const isValidCity =
      /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/.test(
        clientInfo.city
      );
    setError((prevState) => ({
      ...prevState,
      city: isValidCity ? "" : "Please enter a valid city",
    }));
  };

  const handleRegionBlur = () => {
    const isValidRegion =
      /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/.test(
        clientInfo.region
      );
    setError((prevState) => ({
      ...prevState,
      region: isValidRegion ? "" : "Please enter a valid state",
    }));
  };

  const handleEmailBlur = () => {
    const isValidEmail = /\S+@\S+\.\S+/.test(clientInfo.email);
    if (!isValidEmail) {
      setError((prevState) => ({
        ...prevState,
        email: "Please enter a valid email",
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        email: "",
      }));
    }
  };

  const handleZipBlur = () => {
    const isValidZip = clientInfo.zip.length === 6;
    setError((prevState) => ({
      ...prevState,
      zip: isValidZip ? "" : "Please enter a valid ZIP",
    }));
  };

  const handlePhoneBlur = () => {
    const isValidPhone = /^(?:[0-9] ?){6,14}[0-9]$/.test(clientInfo.phone);
    setError((prevState) => ({
      ...prevState,
      phone: isValidPhone ? "" : "Please enter a valid phone number",
    }));
  };

  return (
    <>
      <h1 className="text-xl font-semibold my-6 px-8 lg:px-0">
        Billing Information
      </h1>

      <form>
        <div className="flex-col w-full px-8 lg:px-0 lg:pr-24">
          <div className="flex-col my-5  space-y-2 w-full">
            <label className="font-medium">Name</label>
            <div className="flex w-full justify-between">
              <div className="w-[48.5%]">
                <input
                  className="p-3 w-full border-2"
                  type="text"
                  name="name"
                  value={clientInfo.name}
                  onChange={handleChange}
                  onBlur={handleNameBlur}
                  placeholder="John"
                />
                <InputError error={error.name} />
              </div>
              <div className="w-[48.5%]">
                <input
                  className="p-3 w-full border-2"
                  type="text"
                  name="lastName"
                  value={clientInfo.lastName}
                  onChange={handleChange}
                  onBlur={handleLastNameBlur}
                  placeholder="Doe"
                />
                <InputError error={error.lastName} />
              </div>
            </div>
          </div>

          <div className="flex-col my-5 space-y-2">
            <label className="font-medium">Address</label>
            <input
              className="p-3 w-full border-2"
              type="text"
              name="address"
              value={clientInfo.address}
              onChange={handleChange}
              onBlur={handleAddressBlur}
              placeholder="123 Freedom Street"
            />
            <InputError error={error.address} />
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
                onBlur={handleCountryBlur}
                placeholder="USA"
              />
              <InputError error={error.country} />
            </div>
            <div className="flex-col w-[23%] space-y-2">
              {" "}
              <label className="font-medium">Region/State</label>
              <input
                className="p-3  w-full border-2"
                type="text"
                name="region"
                value={clientInfo.region}
                onChange={handleChange}
                onBlur={handleRegionBlur}
                placeholder="Oregon"
              />
              <InputError error={error.region} />
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
                onBlur={handleCityBlur}
                placeholder="Springfield"
              />
              <InputError error={error.city} />
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
                placeholder="H8E7T4"
              />
              <InputError error={error.zip} />
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
                placeholder="john@doe.com"
              />
              <InputError error={error.email} />
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
                onBlur={handlePhoneBlur}
                placeholder="1222333444"
              />
              <InputError error={error.phone} />
            </div>
          </div>

          <div className="bg-white w-full border-2 flex-col px-5 py-3 mt-10 mb-5">
            <div className="border-b-2 py-3">
              <label className="font-semibold text-lg">Payment Option</label>
            </div>

            <div className="flex pb-4 pt-10">
              <div className="flex-col items-center justify-center w-1/3 p-10 border-r-2">
                <div className="flex items-center justify-center">
                  <img
                    src="https://t3.ftcdn.net/jpg/06/77/91/52/360_F_677915206_Cfw84wC6jGkAkJGSLeHedSYyvavkFeQy.jpg"
                    className="w-6 h-6 mr-2"
                    alt="paypal"
                  />
                  <label className="m-1 text-md font-medium">Cash</label>
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
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174861.png"
                    className="w-6 h-6 mr-2"
                    alt="paypal"
                  />
                  <label className="m-1 text-md font-medium">Paypal</label>
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
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/126/126057.png"
                    className="w-6 h-6 mr-2"
                    alt="credit"
                  />
                  <label className="m-1 text-md font-medium">Credit</label>
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
