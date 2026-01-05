"use client";

import HumanValidationForm from "@/components/humanValidation/humanValidationForm";
import { Card, CardContent } from "@/components/ui/card";

const TestPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[90%] h-[95%]">
        <CardContent>
          <HumanValidationForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPage;
