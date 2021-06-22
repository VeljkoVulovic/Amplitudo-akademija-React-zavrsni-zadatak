import React, { useEffect, useState } from "react";
import { Form, Button, Select, Spin, DatePicker, Popover } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  CloudUploadOutlined,
  CarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  updateReservation,
  showReservation,
  getLocations,
} from "../../services/reservations";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useModal } from "../../contexts/ModalContext";
import moment from "moment";
import PropTypes from "prop-types";

const ReservationForm = ({ id, disabled }) => {
  const queryClient = useQueryClient();
  const [enableQuery, setEnableQuery] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { close } = useModal();
  const { data: getLocationsResponse } = useQuery("getLocations", getLocations);
  const { data: showReservationResponse, isLoading } = useQuery(
    ["showReservation", id],
    () => showReservation(id),
    {
      enabled: enableQuery,
    }
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const editMutation = useMutation(
    ["editMutation", id],
    (data) => updateReservation(data, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("reservations");
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
    if (id) {
      editMutation.mutate({
        client_id: showReservationResponse?.data.client_id,
        vehicle_id: showReservationResponse?.data.vehicle_id,
        from_date: data.from_date.format("YYYY-MM-DD"),
        to_date: data.to_date.format("YYYY-MM-DD"),
        rent_location_id: data.rent_location_id,
        return_location_id: data.return_location_id,
        equipment: showReservationResponse?.data?.equipment.map((equipment) => {
          return {
            equipment_id: equipment.id,
            quantity: equipment.max_quantity,
          };
        }),
      });
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (id) {
      reset({
        from_date: moment(showReservationResponse?.data.from_date),
        to_date: moment(showReservationResponse?.data.to_date),
        rent_location_id: showReservationResponse?.data.rent_location_id,
        return_location_id: showReservationResponse?.data.return_location_id,
      });
    }
  }, [id, showReservationResponse, reset]);

  useEffect(() => {
    if (id) {
      setEnableQuery(true);
    }
    return () => {
      reset({});
    };
  }, [id, reset]);

  const clientContent = (
    <div>
      <p>Name: {showReservationResponse?.data.client.name}</p>
      <p>
        No of document:{" "}
        {showReservationResponse?.data.client.identification_document_no}
      </p>
      <p>Email: {showReservationResponse?.data?.client.email}</p>
      <p>Phone: {showReservationResponse?.data?.client.phone_no}</p>
      <p>Country: {showReservationResponse?.data?.client.country.name}</p>
    </div>
  );

  const carContent = (
    <div>
      <p>Plate number: {showReservationResponse?.data.vehicle.plate_no}</p>
      <p>
        Production year: {showReservationResponse?.data.vehicle.production_year}
      </p>
      <p>Type of car: {showReservationResponse?.data.vehicle.car_type.name}</p>
      <p>No of seats: {showReservationResponse?.data.vehicle.no_of_seats}</p>
      <p>
        Price per day: {showReservationResponse?.data.vehicle.price_per_day}
      </p>
      {showReservationResponse?.data?.equipment?.map((equipment, index) => {
        return (
          <p key={index}>
            Equipment {index + 1} : {equipment.name} - (x
            {equipment.pivot.quantity})
          </p>
        );
      })}
    </div>
  );

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="popoverDiv">
          <Popover placement="bottom" content={carContent} title="Car info">
            <Button icon={<CarOutlined />} shape="round">
              Car info
            </Button>
          </Popover>
          {disabled !== true ? (
            <Popover
              placement="bottom"
              content={clientContent}
              title="Client info"
            >
              <Button icon={<UserOutlined />} shape="round" hidden={disabled}>
                Client info
              </Button>
            </Popover>
          ) : (
            <></>
          )}
        </div>
        <Form onSubmit={handleSubmit(onError)}>
          <Form.Item label="From date"></Form.Item>
          <Controller
            name="from_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="width"
                {...field}
                placeholder="From date"
                disabled={disabled}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please select from data!",
              },
            }}
          />
          {errors?.from_date?.message !== "" ? (
            <span className="errorSpan">{errors?.from_date?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="To date"></Form.Item>
          <Controller
            name="to_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="width"
                {...field}
                placeholder="To date"
                disabled={disabled}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please select from data!",
              },
            }}
          />
          {errors?.to_date?.message !== "" ? (
            <span className="errorSpan">{errors?.to_date?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="Country"></Form.Item>
          <Controller
            name="rent_location_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                disabled={disabled}
                className="width"
                placeholder="-- Choose rent location --"
                options={getLocationsResponse?.data?.map((location) => {
                  return { value: location.id, label: location.name };
                })}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please select rent location!",
              },
            }}
          />
          {errors?.rent_location_id?.message !== "" ? (
            <span className="errorSpan">
              {errors?.rent_location_id?.message}
            </span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="Country"></Form.Item>
          <Controller
            name="return_location_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                disabled={disabled}
                className="width"
                placeholder="-- Choose return location --"
                options={getLocationsResponse?.data?.map((location) => {
                  return { value: location.id, label: location.name };
                })}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please select return location!",
              },
            }}
          />
          {errors?.return_location_id?.message !== "" ? (
            <span className="errorSpan">
              {errors?.return_location_id?.message}
            </span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <div className="buttons">
            <Button
              icon={<CloudUploadOutlined className="site-form-item-icon" />}
              type="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={disabled}
            >
              Submit
            </Button>
          </div>
        </Form>
        {errorMessage !== "" ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}
      </Spin>
    </>
  );
};

export default ReservationForm;

ReservationForm.propTypes = {
  id: PropTypes.number,
  disabled: PropTypes.bool,
};
