"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveMap } from "@liveblocks/client";

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_Vj8KWdDIszlTahKPxq8_LbF3emlHsnVEJ6qU7yKersGVXrn40-8ncB8o3oQ9Clg4"}>
      <RoomProvider id="my-room"
        initialPresence={{
          cursor:null,
          cursorColor:null,
          editingText:null
        }}
        initialStorage={{
          canvasObjects:new LiveMap()
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}