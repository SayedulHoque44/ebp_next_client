import moment from "moment-timezone";

interface DeviceDetailsData {
  os: string;
  deviceType: string;
  browser: string;
  resolution: string;
  osType: string;
  fullUserAgent: string;
  createdAt: string;
}

interface DeviceDetailsContentProps {
  deviceData: DeviceDetailsData;
}

const DeviceDetailsContent = ({ deviceData }: DeviceDetailsContentProps) => {
  return (
    <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm">
        <span className="font-semibold">OS:</span> {deviceData.os}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Device Type:</span> {deviceData.deviceType}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Browser:</span> {deviceData.browser}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Resolution:</span> {deviceData.resolution}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Last Login:</span>{" "}
        {moment(deviceData.createdAt).local().format("MMM D, YYYY HH:mm")}
      </p>
      <p className="break-all text-xs text-gray-600">
        <span className="font-semibold">User Agent:</span> {deviceData.fullUserAgent}
      </p>
    </div>
  );
};

export default DeviceDetailsContent;
