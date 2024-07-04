"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import React, { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRamptxn } from "@/actions/createOnRamptxn";

const SUPPORTED_BANKS = [
  {
    name: "select",
    redirectUrl: "nono",
  },
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState<string>();
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(e) => setAmount(Number(e))}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              if (provider === "select") return alert("select the provider");
              await createOnRamptxn(amount, provider);
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
