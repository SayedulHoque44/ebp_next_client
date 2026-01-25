"use client";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  memo,
} from "react";
import { Form, Input } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PiTableFill } from "react-icons/pi";
import { MdDescription, MdOutlineTitle } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";
import SingleUrl from "./components/SingleUrl";
import SystemManagementHooks from "@/features/System/hooks/system.hooks";
import { ISystem } from "@/features/System/interface/system.interface";
import { QUERY_KEY } from "@/constants/constendData";

interface SystemContextValue {
  system: ISystem;
  refetch: () => void;
}

export const SystemContext = createContext<SystemContextValue | null>(null);

interface SingleSystemProps {
  systemId: string;
}

const SingleSystem = memo(({ systemId }: SingleSystemProps) => {
  const {
    data,
    isLoading,
    refetch,
  } = SystemManagementHooks.useGetSingleSystem({
    queryKey: [QUERY_KEY.SINGLE_SYSTEM, systemId],
    params: { systemId },
  });

  const system = data?.data as ISystem | undefined;

  const contextValue = useMemo<SystemContextValue | null>(
    () =>
      system
        ? {
            system,
            refetch,
          }
        : null,
    [system, refetch]
  );

  const redirectUrl = system?.redirect_url || [];
  const socialMedia = system?.social_media || [];
  const posters = system?.posters || [];

  if (!contextValue) {
    return null;
  }

  return (
    <SystemContext.Provider value={contextValue}>
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-P-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-P-primary shadow-inner">
                <PiTableFill size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide mb-1">
                  {system.category}
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
                <HandledIndividualFieldWithAntDesign system={system} />
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
                    {redirectUrl.length} Links
                  </span>
                </div>

                {redirectUrl.length > 0 ? (
                  <div className="flex gap-3 flex-wrap">
                    {redirectUrl.map((item) => (
                      <SingleUrl
                        key={item._id}
                        item={item}
                        allLinks={redirectUrl}
                        field="redirect_url"
                        fullWidth={false}
                        create={false}
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
                <div className="flex items-center justify-between mb-6 pb-4 border border-gray-100 border-opacity-0 border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                      <MdDescription size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Social Links
                    </h2>
                  </div>
                </div>

                {socialMedia.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {socialMedia.map((item) => (
                      <SingleUrl
                        key={item._id}
                        item={item}
                        allLinks={socialMedia}
                        field="social_media"
                        fullWidth
                        create={false}
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

                {posters.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {posters.map((item) => (
                      <SingleUrl
                        key={item._id}
                        item={item}
                        allLinks={posters}
                        field="posters"
                        fullWidth
                        create={false}
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
});

SingleSystem.displayName = "SingleSystem";

interface HandledIndividualFieldWithAntDesignProps {
  system: ISystem;
}

const HandledIndividualFieldWithAntDesign = ({
  system,
}: HandledIndividualFieldWithAntDesignProps) => {
  const [form] = Form.useForm();
  const updateSystemMutation = SystemManagementHooks.useUpdateSingleSystem();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    form.setFieldsValue(system);
  }, [form, system]);

  const handleMutation = useCallback(
    async (systemData: Partial<ISystem>) => {
      await updateSystemMutation.mutateAsync({
        systemId: system._id,
        data: systemData,
      });
    },
    [system._id, updateSystemMutation]
  );

  const handleChange =
    (fieldName: keyof ISystem) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        form
          .validateFields([fieldName])
          .then(() => {
            handleMutation({ [fieldName]: value } as Partial<ISystem>);
          })
          .catch(() => {
            // validation errors handled by antd
          });
      }, 1000);
    };

  return (
    <Form
      form={form}
      initialValues={system}
      layout="vertical"
      disabled={updateSystemMutation.isPending}
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
          onChange={handleChange("title")}
          prefix={<MdOutlineTitle />}
        />
      </Form.Item>

      {/* System Description */}
      <Form.Item label="System Description" name="description">
        <Input
          size="large"
          placeholder="System Description"
          onChange={handleChange("description")}
          prefix={<MdDescription />}
        />
      </Form.Item>

      {/* System Category */}
      <Form.Item
        label="System Type"
        name="category"
        rules={[
          {
            required: true,
            message: "System Type is required",
          },
        ]}
      >
        <Input
          disabled
          size="large"
          placeholder="System Type"
          prefix={<BiCategoryAlt />}
        />
      </Form.Item>
    </Form>
  );
};

export default SingleSystem;

