import React, { useState } from "react";
import Select from "react-select";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import useWordCount from "../../../hooks/useWordCount";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_CLIENT_URL;
function CreateAnnouncement() {
  const { wordCount, handleWordCount } = useWordCount();
  const navigate = useNavigate();
  const settingsSchema = Yup.object().shape({
    title: Yup.string()
      .min(10)
      .max(
        150,
        "Annoucement name must be a string with a maximum of 150 characters"
      )
      .required("Annoucement  title is required"),

    description: Yup.string()
      .required("Annoucement  description is required")
      .test("max-words", "Description cannot exceed 400 words", (value) => {
        if (value) {
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount <= 400;
        }
        return true;
      }),
  });

  let initialValues = {
    title: "",
    description: "",
  };

  async function handleSubmitAnnouncement(
    values: { title: string; description: string },
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<{ title: string; description: string }>
  ) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await fetch(`${API_URL}/api/v1/secure/announcement`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),

        credentials: "include",
      });

      console.log(await res);
      if (res.ok) {
        const { message } = await res.json();
        toast.success(message);
        resetForm();
      } else {
        const errorData = await res.json();

        toast.error(errorData.msg || "An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <section>
        <h1 className="text-2xl text-[#212529] font-bold">
          Create Annoucement
        </h1>
        <div className="form mt-8 w-full max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={settingsSchema}
            onSubmit={handleSubmitAnnouncement}
          >
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className=" space-y-2">
                    <Lable label="Announcement Title *" className=" text-xs" />
                    <TextInput
                      type="text"
                      placeholderText="Enter Announcement title"
                      name="title"
                      value={values.title}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.title && errors.title}
                    </span>
                  </div>

                  <div className=" space-y-2">
                    <Lable
                      label="Announcement Description*"
                      className=" text-xs"
                    />
                    <div>
                      <div className="w-full px-3 py-2  rounded-lg  border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA] border mb-2">
                        <textarea
                          rows={8}
                          placeholder="Announcement Description"
                          className=" w-full border-0 outline-0 bg-[#F4F6F7] "
                          name="description"
                          value={values.description}
                          onChange={(e) => {
                            handleChange(e);
                            handleWordCount(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] text-red-400">
                          {errors.description && errors.description}
                        </span>
                        <small className="text-[#1A4F83]">
                          {wordCount}/400
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Button
                  text="Create Announcement "
                  className="w-full mt-8"
                  disableBtn={isSubmitting}
                /> */}
                <Button
                  type="submit"
                  text="Create Announcement"
                  isSubmitting={isSubmitting}
                  disableBtn={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting && (
                    <Oval
                      visible={true}
                      height="24"
                      width="24"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  )}
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
}

export default CreateAnnouncement;
