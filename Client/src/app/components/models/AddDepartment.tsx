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
import { useDeptStore } from "@/store/deptStore";

type FormValues = {
  name: string;
  email: string;
  phone: string;
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
  triggerRef: RefObject<any>;
  handleNo?: () => void;
};

function AddDepartment({ handleNo, triggerRef }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const addDeptData = useDeptStore(state => state.addDeptData)

  const fetchDepartments = () => {

  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/add-department`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(`${result.msg}`, {
          duration: 5000,
        });
        addDeptData(result.data)
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
      <SheetContent className="font-poppins p-0 w-full sm:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] overflow-y-auto">
        <div className="flex justify-center items-center">
          <Card className="sm:w-[600px] h-screen overflow-hidden flex flex-col z-10">
            <CardHeader className="bg-blue-300">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                Add new Dept
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
                  label="Name"
                  id="name"
                  placeholder="Enter the name"
                  error={errors.name}
                  type="text"
                  register={register("name", {
                    required: "this field can't be empty",
                  })}
                />

                <InputBlock
                  label="Email"
                  id="email"
                  placeholder="Enter the email"
                  type="email"
                  error={errors.email}
                  register={register("email", {
                    required: "this field can't be empty",
                  })}
                />

                <InputBlock
                  label="Phone"
                  id="phone"
                  placeholder="Enter the phone number"
                  type="tel"
                  error={errors.phone}
                  register={register("phone", {
                    required: "this field can't be empty",
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
                    className="text-base bg-blue-400 w-1/2 hover:bg-blue-500"
                  >
                    Add
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
        className={`h-11 text-base rounded-lg px-3 py-4 border-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-orange-500`}
        {...register}
      />
      {error && (
        <span className="mt-1 ml-1 text-base text-red-500 flex items-center gap-1">
          <OctagonAlert className="w-5 h-5" />
          {error.message}
        </span>
      )}
    </div>
  );
}

export default AddDepartment;
