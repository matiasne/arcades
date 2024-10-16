import * as React from "react";
import Head from "next/head";
import { Shell } from "../../components/sys";
import { useAuthSession } from "../../components/sys/providers/SessionProvider";
import { useRouter } from "next/router";

export default function Index() {
  const { signOut, authUser } = useAuthSession();
  const router = useRouter();
  const { machineId, businessId } = router.query;

  return (
    <Shell footer={false} title={machineId}>
      <Head>
        <title> Home</title>
      </Head>
    </Shell>
  );
}
