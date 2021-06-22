import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  IdcardOutlined,
  CalendarOutlined,
  UserOutlined,
  MailOutlined,
  CloudUploadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  storeClient,
  getCountries,
  updateClient,
  showClient,
} from "../../services/clients";
import { useModal } from "../../contexts/ModalContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import TextArea from "antd/lib/input/TextArea";

const ClientForm = ({ id, disabled }) => {
  const queryClient = useQueryClient();
  const [enableQuery, setEnableQuery] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { close } = useModal();
  const { data: getCountriesResponse } = useQuery("getCountries", getCountries);
  const { data: showClientResponse, isLoading } = useQuery(
    ["showClient", id],
    () => showClient(id),
    {
      enabled: enableQuery,
    }
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: showClientResponse?.data?.client });

  const addMutation = useMutation((data) => storeClient(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      setErrorMessage("");
      close();
    },
    onError: (error) => {
      setErrorMessage(error?.response?.data?.message);
    },
  });

  const editMutation = useMutation(
    ["editMutation", id],
    (data) => updateClient(data, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clients");
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
      let phone_number = parseInt(data.phone_no);
      editMutation.mutate({
        name: data.name,
        phone_no: phone_number,
        email: data.email,
        identification_document_no: data.identification_document_no,
        country_id: data.country_id,
      });
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    reset(showClientResponse?.data?.client);
    setErrorMessage("");
  }, [showClientResponse?.data?.client, reset]);

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
          <Form.Item label="Name"></Form.Item>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Name"
                autoComplete="off"
                disabled={disabled}
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please enter name!",
              },
              minLength: {
                value: 4,
                message: "Minimum length: 4 characters.",
              },
              maxLength: {
                value: 30,
                message: "Maximum length: 30 characters.",
              },
              pattern: {
                value: /^[a-z ,.'-]+$/i,
                message: "Please enter valid name!",
              },
            }}
          />
          {errors?.name?.message !== "" ? (
            <span className="errorSpan">{errors?.name?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="Identification document number"></Form.Item>
          <Controller
            name="identification_document_no"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                disabled={disabled}
                autoComplete="off"
                placeholder="Identification document number"
                prefix={<IdcardOutlined className="site-form-item-icon" />}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please enter identification document no!",
              },
              pattern: {
                value: /^[0-9]{1,3}$/i,
                message:
                  "Please enter a valid identification document no! (1 to 3 digit)",
              },
            }}
          />
          {errors?.identification_document_no?.message !== "" ? (
            <span className="errorSpan">
              {errors?.identification_document_no?.message}
            </span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="Country"></Form.Item>
          <Controller
            name="country_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="width"
                disabled={disabled}
                placeholder="-- Choose country --"
                options={getCountriesResponse?.data?.map((country) => {
                  return { value: country.id, label: country.name };
                })}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please select country!",
              },
            }}
          />
          {errors?.country_id?.message !== "" ? (
            <span className="errorSpan">{errors?.country_id?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="Phone"></Form.Item>
          <Controller
            name="phone_no"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Phone"
                autoComplete="off"
                disabled={disabled}
                prefix={<CalendarOutlined className="site-form-item-icon" />}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please enter phone!",
              },
              pattern: {
                value: /^(\+\d{1,3}\s)?\(?\d{2,3}\)?[\s.-]\d{3}[\s.-]\d{3}$/i,
                message: "Please enter valid phone!",
              },
            }}
          />
          {errors?.phone_no?.message !== "" ? (
            <span className="errorSpan">{errors?.phone_no?.message}</span>
          ) : (
            <span className="errorSpan"></span>
          )}
          <Form.Item label="Email"></Form.Item>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                disabled={disabled}
                autoComplete="off"
                placeholder="Email"
                prefix={<MailOutlined className="site-form-item-icon" />}
              />
            )}
            rules={{
              minLength: {
                value: 4,
                message: "Minimum length: 4 characters.",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email! ( example@mail.com )",
              },
              required: {
                value: true,
                message: "Please input email!",
              },
            }}
          />
          {errors?.email?.message !== "" ? (
            <span className="errorSpan">{errors?.email?.message}</span>
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
          <div className="buttons">
            <Button
              icon={<CloudUploadOutlined className="site-form-item-icon" />}
              type="primary"
              disabled={disabled}
              onClick={handleSubmit(onSubmit)}
              htmlType="submit"
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

export default ClientForm;

ClientForm.propTypes = {
  id: PropTypes.number,
  disabled: PropTypes.bool,
};
