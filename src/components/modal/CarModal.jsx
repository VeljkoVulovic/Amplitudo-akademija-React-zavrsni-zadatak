import React, { useState } from "react";
import { Form, Input, Modal, Button, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  IdcardOutlined,
  RightOutlined,
  LeftOutlined,
  CalendarOutlined,
  InsertRowRightOutlined,
  EuroOutlined,
  PlusSquareOutlined,
  EditFilled,
  InfoCircleOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { storeCar } from "../../services/cars";
import TextArea from "antd/lib/input/TextArea";

const CarModal = ({ name, carData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    storeCar(data)
      .then(function (response) {
        console.log(response);
        setIsModalVisible(false);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        setErrorMessage(error?.response?.data?.message);
      });
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <>
      {name === "Add" ? (
        <Button
          type="primary"
          icon={<PlusSquareOutlined className="site-form-item-icon" />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Car
        </Button>
      ) : name === "Edit" ? (
        <Button
          icon={
            <EditFilled
              className="site-form-item-icon"
              style={{ color: "blue" }}
            />
          }
          onClick={() => setIsModalVisible(true)}
        >
          Edit
        </Button>
      ) : (
        <Button
          icon={
            <InfoCircleOutlined
              className="site-form-item-icon"
              style={{ color: "green" }}
            />
          }
          onClick={() => setIsModalVisible(true)}
        >
          Info
        </Button>
      )}
      <Modal
        width="400px"
        title={name}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onSubmit={handleSubmit(onError)}>
          <Form.Item label="Plate number"></Form.Item>
          <Controller
            name="plate_no"
            control={control}
            defaultValue={carData?.plate_no}
            render={({ field }) => (
              <Input
                {...field}
                type="string"
                placeholder="Plate number"
                autoComplete="off"
                prefix={<IdcardOutlined className="site-form-item-icon" />}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please enter plate number!",
              },
              pattern: {
                value: /^[A-Z]{2,2} [A-Z0-9]{5,5}$/,
                message: "Please enter a valid plate number (ex AB AB123)",
              },
            }}
          />
          {errors?.plate_no?.message !== "" ? (
            <span className="errorSpan">{errors?.plate_no?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="Production year"></Form.Item>
          <Controller
            name="production_year"
            control={control}
            defaultValue={carData?.production_year}
            render={({ field }) => (
              <Input
                {...field}
                type="string"
                autoComplete="off"
                placeholder="Production year"
                prefix={<CalendarOutlined className="site-form-item-icon" />}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please enter production year!",
              },
              pattern: {
                value: /^[0-9]{4,4}$/,
                message: "Please enter a valid production year!",
              },
            }}
          />
          {errors?.production_year?.message !== "" ? (
            <span className="errorSpan">
              {errors?.production_year?.message}
            </span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="Car type"></Form.Item>
          <Controller
            name="car_type_id"
            control={control}
            defaultValue={carData?.car_type?.name}
            render={({ field }) => (
              <Select
                style={{ width: "352px" }}
                {...field}
                options={[
                  { value: "1", label: "Small" },
                  { value: "2", label: "Medium" },
                  { value: "3", label: "Premium" },
                ]}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please select car type!",
              },
            }}
          />
          {errors?.car_type_id?.message !== "" ? (
            <span className="errorSpan">{errors?.car_type_id?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="No of seats"></Form.Item>
          <Controller
            name="no_of_seats"
            control={control}
            defaultValue={carData?.no_of_seats}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                autoComplete="off"
                placeholder="Number of seats"
                prefix={
                  <InsertRowRightOutlined className="site-form-item-icon" />
                }
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please enter number of seats!",
              },
              pattern: {
                value: /^[0-9]{1,2}$/,
                message: "Please enter a valid number of seats",
              },
            }}
          />
          {errors?.no_of_seats?.message !== "" ? (
            <span className="errorSpan">{errors?.no_of_seats?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="Price per day"></Form.Item>
          <Controller
            name="price_per_day"
            control={control}
            defaultValue={carData?.price_per_day}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                autoComplete="off"
                placeholder="Price per day"
                prefix={<EuroOutlined className="site-form-item-icon" />}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please enter price per day!",
              },
            }}
          />
          {errors?.price_per_day?.message !== "" ? (
            <span className="errorSpan">{errors?.price_per_day?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item
            label="Remarks"
            tooltip={{
              title: "This is a optional field",
              icon: <InfoCircleOutlined />,
            }}
          ></Form.Item>
          <Controller
            name="remarks"
            control={control}
            defaultValue={carData?.remarks}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Remarks"
                showCount
                maxLength={100}
              />
            )}
          />
          {name === "Info" ? (
            <div style={{ marginTop: "25px" }}></div>
          ) : (
            <div style={{ width: "120px", display: "inline-flex" }}>
              <Button
                style={{
                  width: "120px",
                  marginLeft: "36px",
                  marginTop: "35px",
                  marginRight: "20px",
                }}
                icon={<LeftOutlined className="site-form-item-icon" />}
              >
                Return
              </Button>
              <Button
                style={{
                  width: "120px",
                  marginTop: "35px",
                  marginRight: "20px",
                }}
                icon={<RightOutlined className="site-form-item-icon" />}
                type="primary"
              >
                Next
              </Button>
              <Button
                style={{ width: "120px", marginTop: "35px" }}
                icon={<CloudUploadOutlined className="site-form-item-icon" />}
                type="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </div>
          )}
        </Form>
        {errorMessage !== "" ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}
      </Modal>
    </>
  );
};

export default CarModal;
