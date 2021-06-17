import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  IdcardOutlined,
  CalendarOutlined,
  UserOutlined,
  InfoCircleOutlined,
  MailOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import {
  storeClient,
  getCountries,
  updateClient,
  showClient,
} from "../../services/clients";
import TextArea from "antd/lib/input/TextArea";
import { useModal } from "../../contexts/ModalContext";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
      setErrorMessage(error?.response?.data?.errors);
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
      editMutation.mutate({
        name: data.name,
        phone_no: data.phone_no,
        email: data.email,
        identification_document_no: data.identification_document_no,
        country_id: data.country_id,
        remarks: data.remarks,
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
                placeholder="Identification document number"
                prefix={<IdcardOutlined className="site-form-item-icon" />}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please enter identification document no!",
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
                style={{ width: "352px" }}
                disabled={disabled}
                {...field}
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
          {errors?.country?.message !== "" ? (
            <span className="errorSpan">{errors?.country?.message}</span>
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
                disabled={disabled}
                prefix={<CalendarOutlined className="site-form-item-icon" />}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Please enter phone!",
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
                message: "Please enter a valid email",
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
          <Button
            style={{ width: "120px", marginTop: "35px" }}
            icon={<CloudUploadOutlined className="site-form-item-icon" />}
            type="primary"
            disabled={disabled}
            onClick={handleSubmit(onSubmit)}
            htmlType="submit"
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

export default ClientForm;
