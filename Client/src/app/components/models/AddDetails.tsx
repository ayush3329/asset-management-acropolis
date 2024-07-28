import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";
import { OctagonAlert, Code2 } from "lucide-react";
import { RefObject } from "react";
import toast from "react-hot-toast";

type FormValues = {
  deptId: string;
  uniqueId: string;
  type: string;
};

type InputBoxData = {
  label: string;
  id: string;
  placeholder?: string;
  type: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

type Props = {
  isUpdate: boolean;
  triggerRef: RefObject<any>;
  handleNo?: () => void;
};

function AddDetails({ isUpdate, handleNo, triggerRef }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/add-assets`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            deptId: data.deptId,
            uniqueId: data.uniqueId.split(','),
            type: data.type
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(`${result.msg}`, {
          duration: 5000,
        });
        triggerRef.current?.click()
      } else {
        toast.error(`${result.msg}`, {
          duration: 5000,
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger ref={triggerRef}></SheetTrigger>
      <SheetContent className="p-0 w-full sm:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] overflow-y-auto">
        <div className="font-poppins flex justify-center items-center">
          <Card className="sm:w-[600px] h-screen overflow-hidden flex flex-col z-10">
            <CardHeader className="bg-blue-300">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                Add new asset
                <Code2 />
              </CardTitle>
              <CardDescription className="text-gray-900 font-semibold">
                Fill all the fields with the corresponding details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex-grow overflow-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
              >
                {/* User Name */}
                <InputBlock
                  label="Department id"
                  id="deptId"
                  placeholder="Enter the dept. id"
                  error={errors.deptId}
                  type="text"
                  register={register("deptId", {
                    required: "this field cant be empty",
                  })}
                />

                <InputBlock
                  label="Unique id"
                  id="uniqueId"
                  placeholder="Enter the uniqueId"
                  type="text"
                  error={errors.uniqueId}
                  register={register("uniqueId", {
                    required: "this field cant be empty",
                  })}
                />

                <InputBlock
                  label="Type of Asset"
                  id="type"
                  placeholder="Enter the type of asset"
                  type="text"
                  error={errors.type}
                  register={register("type", {
                    required: "this field cant be empty",
                  })}
                />
                
                {/* Form Buttons */}
                <div className="w-full flex justify-between items-center gap-4">
                  <Button
                    type="button"
                    onClick={handleNo}
                    variant="outline"
                    className="w-1/2 text-base"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-400 text-base w-1/2 hover:bg-blue-500"
                  >
                    {isUpdate ? "Edit" : "Add"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function InputBlock({
  label,
  id,
  type,
  placeholder,
  error,
  register,
}: InputBoxData) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor={id} className="font-semibold text-lg pl-[2px]">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`h-11 rounded-lg text-base px-3 py-4 border-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-orange-500`}
        {...register}
      />
      {error && (
        <span className="mt-1 ml-1 text-sm text-red-500 flex items-center gap-1">
          <OctagonAlert className="w-5 h-5" />
          {error.message}
        </span>
      )}
    </div>
  );
}

export default AddDetails;
