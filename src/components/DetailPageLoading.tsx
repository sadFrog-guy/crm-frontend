import { Spinner } from "@nextui-org/spinner";

export default function DetailPageLoading() {
  return (
    <div className="w-full h-[80vh] relative">
      <Spinner
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        color="default"
        size="md"
      />
    </div>
  );
}
