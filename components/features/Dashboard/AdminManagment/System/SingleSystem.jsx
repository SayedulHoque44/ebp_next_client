import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useGetSingleSystemQuery,
  useUpdateSingleSystemMutation,
} from "../../../../redux/Api/SystemManagmentApi";
import { PiTableFill } from "react-icons/pi";
import EBFrom from "../../../../Shared/Components/EBFrom";
import EBInput from "../../../../Shared/Components/EBInput";
import EBFTextarea from "../../../../Shared/Components/EBFTextarea";
import EBFSelect from "../../../../Shared/Components/EBFSelect";
import { Button, Form, Input } from "antd";
import SingleUrl from "./components/SingleUrl";
import { MdCode, MdDescription, MdOutlineTitle } from "react-icons/md";
import { debounce } from "lodash";
import { LuImagePlus } from "react-icons/lu";
import {
  ReusableFormAntD,
  ReusableInputFieldAntD,
} from "../../../../Shared/Components/ReuseableFormAntD";

import { BiCategoryAlt } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SystemContext = createContext(null);

const SingleSystem = ({ systemId }) => {
  const { data, isLoading, refetch } = useGetSingleSystemQuery(systemId);

  const system = data?.data;

  const { redirect_url, social_media, posters } = system || {};

  return (
    <SystemContext.Provider value={{ system, refetch }}>
      {isLoading ? (
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-6">
              <Skeleton circle width={64} height={64} />
              <div className="flex-1">
                <Skeleton width={200} height={32} className="mb-2" />
                <Skeleton width={300} height={20} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <Skeleton height={300} className="rounded-2xl" />
              <Skeleton height={400} className="rounded-2xl" />
            </div>
            <div className="space-y-8">
              <Skeleton height={300} className="rounded-2xl" />
              <Skeleton height={300} className="rounded-2xl" />
            </div>
          </div>
        </div>
      ) : system ? (
        <div className="space-y-8">
          {/* Header Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-P-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-P-primary shadow-inner">
                <PiTableFill size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide mb-1">
                  {!isLoading && system?.category}
                </h1>
                <p className="text-gray-500">
                  Manage configuration and resources for this system
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Details Column */}
            <div className="xl:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <MdOutlineTitle size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">
                    System Configuration
                  </h2>
                </div>
                <HandledIndivitualFieldWithAntDesign
                  system={system}
                  refetch={refetch}
                />
              </div>

              {/* Redirect URLs Section */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                      <BiCategoryAlt size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Redirect URLs
                    </h2>
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    {redirect_url?.length || 0} Links
                  </span>
                </div>

                {redirect_url?.length > 0 ? (
                  <div className="flex gap-3 flex-wrap">
                    {redirect_url.map((item, i) => (
                      <SingleUrl
                        key={i}
                        item={item}
                        allLinks={redirect_url}
                        field={"redirect_url"}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-sm">
                      No redirect URLs configured
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Social Links */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                      <MdDescription size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Social Links
                    </h2>
                  </div>
                </div>

                {social_media?.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {social_media.map((item, i) => (
                      <SingleUrl
                        key={i}
                        item={item}
                        allLinks={social_media}
                        field={"social_media"}
                        fullWidth={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-sm">No social links</p>
                  </div>
                )}
              </div>

              {/* Posters */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                      <LuImagePlus size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">Posters</h2>
                  </div>
                </div>

                {posters?.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {posters.map((item, i) => (
                      <SingleUrl
                        key={i}
                        item={item}
                        allLinks={posters}
                        field={"posters"}
                        fullWidth={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-sm">No posters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </SystemContext.Provider>
  );
};

const HandledIndivitualFieldWithAntDesign = ({ system, refetch }) => {
  console.log(system);
  const [updateSystemMutation, { isLoading: isUpdating }] =
    useUpdateSingleSystemMutation();
  // useEffect(() => {
  //   setSystemData(system);
  // }, [system]);
  const [form] = Form.useForm(); // Form instance
  //
  useEffect(() => {
    form.setFieldsValue(system); // Explicitly update form fields
  }, [system, form]);

  //
  const useDebouncedMutation = (mutationFn, delay = 1000) => {
    // Create a debounced version of the mutation function
    const debouncedMutation = useCallback(
      debounce((value) => {
        mutationFn(value);
      }, delay),
      [mutationFn, delay]
    );

    return debouncedMutation;
  };
  //
  const handleMutation = async (systemData) => {
    const res = await updateSystemMutation({
      systemId: system._id,
      systemData,
    });
    refetch();
    console.log(res);
  };
  // Create debounced mutation functions using the custom hook
  const CallDebouncedMutation = useDebouncedMutation((value) =>
    handleMutation(value)
  );

  // Generic onChange handler
  const handleChange = (fieldName, debouncedMutationFn) => (e) => {
    const value = e.target.value;

    // Trigger validation for the specific field
    form
      .validateFields([fieldName])
      .then(() => {
        // If validation passes, call the debounced mutation
        debouncedMutationFn({ [fieldName]: value });
      })
      .catch(() => {
        // Validation failed (error will be shown automatically by Ant Design)
      });
  };

  return (
    <Form
      form={form}
      initialValues={system}
      layout="vertical"
      disabled={isUpdating}
    >
      {/* System Title */}
      <Form.Item
        label="System Title"
        name="title"
        rules={[
          {
            required: true,
            message: "System title cannot be empty!",
          },
        ]}
      >
        <Input
          size="large"
          placeholder="System Title"
          onChange={handleChange("title", CallDebouncedMutation)}
          prefix={<MdOutlineTitle />}
        />
      </Form.Item>

      {/* System Description */}
      <Form.Item label="System Description" name="description">
        <Input
          size="large"
          placeholder="System Description"
          onChange={handleChange("description", CallDebouncedMutation)}
          prefix={<MdDescription />}
        />
      </Form.Item>

      {/* System Code */}
      <Form.Item
        label="System Type"
        name="category"
        rules={[
          {
            required: true,
            message: "System Type",
          },
        ]}
      >
        <Input
          disabled={true}
          size="large"
          placeholder="System Type"
          prefix={<BiCategoryAlt />}
        />
      </Form.Item>
    </Form>
  );
};

const HandledIndivitualFieldWithAntDesign2 = ({ system }) => {
  const fields = {
    title: system?.title,
    description: system?.description,
  };

  const [form] = Form.useForm(); // Form instance
  const useDebouncedMutation = (mutationFn, delay = 500) => {
    // Create a debounced version of the mutation function
    const debouncedMutation = useCallback(
      debounce((value) => {
        mutationFn(value);
      }, delay),
      [mutationFn, delay]
    );

    return debouncedMutation;
  };
  // Define mutation functions for each input
  const handleTitleMutation = (value) => {
    console.log("Calling mutation for title with:", value); // Replace with your mutation logic
  };

  const handleDescriptionMutation = (value) => {
    console.log("Calling mutation for description with:", value); // Replace with your mutation logic
  };

  const handleCodeMutation = (value) => {
    console.log("Calling mutation for code with:", value); // Replace with your mutation logic
  };

  // Create debounced mutation functions using the custom hook
  const debouncedTitleMutation = useDebouncedMutation(handleTitleMutation);
  const debouncedDescriptionMutation = useDebouncedMutation(
    handleDescriptionMutation
  );
  const debouncedCodeMutation = useDebouncedMutation(handleCodeMutation);

  // Generic onChange handler
  const handleChange = (fieldName, debouncedMutationFn) => (e) => {
    const value = e.target.value;

    // Trigger validation for the specific field
    form
      .validateFields([fieldName])
      .then(() => {
        // If validation passes, call the debounced mutation
        debouncedMutationFn(value);
      })
      .catch(() => {
        // Validation failed (error will be shown automatically by Ant Design)
      });
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values); // Handle form submission
  };
  const systemTypeOptions = [
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" },
    { value: "type3", label: "Type 3" },
  ];
  return (
    <ReusableFormAntD
      form={form}
      onSubmit={handleSubmit}
      initialValues={{ title: "", description: "", code: "" }}
    >
      {/* System Title */}
      <ReusableInputFieldAntD
        type="text"
        label="System Title"
        name="title"
        rules={[{ required: true, message: "System title cannot be empty!" }]}
        placeholder="System Title"
        prefix={<MdOutlineTitle />}
        throwError={() => console.log("Error From System Title")}
      />

      {/* System Description */}
      <ReusableInputFieldAntD
        type="textarea"
        label="System Description"
        name="description"
        placeholder="System Description"
        prefix={<MdDescription />}
      />

      {/* System Code */}
      <ReusableInputFieldAntD
        type="text"
        label="System Code"
        name="code"
        rules={[
          { required: true, message: "System code cannot be empty!" },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "System code must be alphanumeric!",
          },
        ]}
        placeholder="System Code"
        prefix={<MdCode />}
      />
      <ReusableInputFieldAntD
        type="select"
        label="System Type"
        name="systemType"
        rules={[{ required: true, message: "Please select a system type!" }]}
        placeholder="Select a system type"
        options={systemTypeOptions}
      />
      <ReusableInputFieldAntD
        type="text"
        label="System Indivitual"
        name="indivitual"
        rules={[{ required: true, message: "System Ind cannot be empty!" }]}
        placeholder="System indivitual Title"
        prefix={<MdOutlineTitle />}
        indivitual={true}
        onChange={(e) =>
          console.log("Title Indivitula changed:", e.target.value)
        }
      />
    </ReusableFormAntD>
  );
};

export default SingleSystem;
