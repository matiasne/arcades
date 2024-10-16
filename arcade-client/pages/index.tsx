import * as React from "react";
import { Head, Shell } from "../components/sys";
import { useAuthSession } from "../components/sys/providers/SessionProvider";

type Resp = {
  token: string;
};

export default function Index() {
  return (
    <Shell footer={false} title={""}>
      <Head title="Loserball | Home" />
    </Shell>
  );
}
