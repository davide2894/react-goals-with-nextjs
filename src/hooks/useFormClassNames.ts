import { useAppSelector } from "@store";

function useFormClassNames() {
  const isSubmitting = useAppSelector(
    (state) => state.formReducer.isSubmitting
  );

  let containerClassNames =
    "flex flex-col items-center lg:justify-center mt-14";

  if (isSubmitting) {
    containerClassNames += " pointer-events-none opacity-50";
  }

  return containerClassNames;
}

export default useFormClassNames;
