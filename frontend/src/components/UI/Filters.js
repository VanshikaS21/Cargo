import React, { useState } from "react";
import DropDown from "../UI/DropDown";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Filters({ openFilter, setOpenFilter }) {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [cost, setCost] = useState("");

  function resetFilters() {
    setDestination("");
    setPickup("");
    setCost("");
  }

  return (
    <div
      className={
        "fixed flex right-0 top-0 p-4 w-screen md:w-[40%] lg:w-1/3 h-screen bg-gray-800 z-50 justify-center ease-in-out duration-300 " +
        (openFilter ? "right-0" : "-right-[100%]")
      }
    >
      <AiFillCloseCircle
        color="white"
        size={28}
        className="absolute left-[50%] top-2 md:top-[70%] cursor-pointer"
        onClick={() => setOpenFilter(!openFilter)}
      />
      <div className="flex flex-col space-y-4 m-4 mt-8 min-w-full md:min-w-0">
        <DropDown
          label={"Pickup Location:"}
          heading={"Select from popular areas"}
          options={[
            "DHA Phase 7",
            "Model Town C Block",
            "Gulberg 1",
            "Sanda",
            "Bahria Town",
          ]}
          selectedValue={pickup}
          setSelectedValue={setPickup}
        />
        <DropDown
          label={"Destination Location:"}
          heading={"Select from popular areas"}
          options={[
            "DHA Phase 7",
            "Model Town C Block",
            "Gulberg 1",
            "Sanda",
            "Bahria Town",
          ]}
          selectedValue={destination}
          setSelectedValue={setDestination}
        />
        <DropDown
          label={"Cost:"}
          heading={"Select from popular cost"}
          options={[
            "less than 2000",
            "less than 2500",
            "less than 3000",
            "less than 3500",
            "less than 4000",
          ]}
          selectedValue={cost}
          setSelectedValue={setCost}
        />
        <button
          className="bg-primaryOrange-light hover:bg-primaryOrange-light text-white py-2 px-4 rounded"
          onClick={() => setOpenFilter(!openFilter)}
        >
          Apply
        </button>

        <button
          className="bg-white text-primaryOrange-light py-2 px-4 rounded"
          onClick={() => resetFilters()}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
