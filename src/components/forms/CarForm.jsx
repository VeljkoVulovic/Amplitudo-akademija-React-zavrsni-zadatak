import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  IdcardOutlined,
  CalendarOutlined,
  InsertRowRightOutlined,
  EuroOutlined,
  CloudUploadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { storeCar, getCarTypes, updateCar, showCar } from "../../services/cars";
import TextArea from "antd/lib/input/TextArea";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useModal } from "../../contexts/ModalContext";

const CarForm = ({ id, disabled }) => {
  const queryClient = useQueryClient();
  const [enableQuery, setEnableQuery] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { close } = useModal();
  const { data: getCarTypesResponse } = useQuery("getCarTypes", getCarTypes);
  const { data: showCarResponse, isLoading } = useQuery(
    ["showCar", id],
    () => showCar(id),
    {
      enabled: enableQuery,
    }
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: showCarResponse?.data });

  const addMutation = useMutation((data) => storeCar(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("cars");
      setErrorMessage("");
      close();
    },
    onError: (error) => {
      setErrorMessage(error?.response?.data?.message);
    },
  });

  const editMutation = useMutation(
    ["editMutation", id],
    (data) => updateCar(data, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cars");
        setErrorMessage("");
        close();
      },
      onError: (error) => {
        console.log(error.response);
        setErrorMessage(error?.response?.data?.message);
      },
    }
  );

  const onSubmit = (data) => {
    if (!id) {
      addMutation.mutate(data);
    } else {
      editMutation.mutate({
        plate_no: data.plate_no,
        production_year: data.production_year,
        car_type_id: data.car_type_id,
        no_of_seats: data.no_of_seats,
        price_per_day: data.price_per_day,
        remarks: data.remarks,
      });
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    reset(showCarResponse?.data);
    setErrorMessage("");
  }, [showCarResponse?.data, reset]);

  useEffect(() => {
    if (id) {
      setEnableQuery(true);
    }
    return () => {
      reset({});
    };
  }, [id, reset]);

  return (
    <>
      <Spin spinning={isLoading}>
        <Form onSubmit={handleSubmit(onError)}>
          <Form.Item label="Plate number"></Form.Item>
          <Controller
            name="plate_no"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                disabled={disabled}
                placeholder="Plate number"
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
            render={({ field }) => (
              <Input
                {...field}
                disabled={disabled}
                placeholder="Production year"
                prefix={<CalendarOutlined className="site-form-item-icon" />}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please enter production year!",
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
            render={({ field }) => (
              <Select
                style={{ width: "352px" }}
                {...field}
                disabled={disabled}
                placeholder="-- Choose type --"
                options={getCarTypesResponse?.data?.data.map((type) => {
                  return { value: type.id, label: type.name };
                })}
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
            render={({ field }) => (
              <Input
                {...field}
                disabled={disabled}
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
            render={({ field }) => (
              <Input
                {...field}
                disabled={disabled}
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
            render={({ field }) => (
              <TextArea
                {...field}
                disabled={disabled}
                placeholder="Remarks"
                showCount
                maxLength={255}
              />
            )}
          />
          <Button
            style={{ width: "120px", marginTop: "35px" }}
            icon={<CloudUploadOutlined className="site-form-item-icon" />}
            type="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={disabled}
          >
            Submit
          </Button>
        </Form>
        {errorMessage !== "" ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}
      </Spin>
    </>
  );
};

export default CarForm;
