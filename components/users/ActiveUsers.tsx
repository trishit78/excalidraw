import { useOthers, useSelf } from "@liveblocks/react";

import styles from './index.module.css'
import { generateRandomName } from "@/lib/utils";
import Avatar from "./Avatar";


const  ActiveUsers = ()=> {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <main className="flex h-screen w-full select-none place-content-center place-items-center">
      <div className="flex pl-3">


        {currentUser && (
            <Avatar  name="You" otherStyles="border-[3px] border-primary-green" />
        )}

        {users.slice(0, 3).map(({ connectionId, info }) => {
          return (
            <Avatar key={connectionId}  name={generateRandomName()}  otherStyles="-ml-3" />
          );
        })}

        {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}

      </div>
    </main>
  );
}
export default ActiveUsers;

// export default function Page() {
//   const roomId = useExampleRoomId("liveblocks:examples:nextjs-live-avatars");

//   return (
//     <RoomProvider id={roomId}>
//       <Example />
//     </RoomProvider>
//   );
// }

// export async function getStaticProps() {
//   const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;
//   const API_KEY_WARNING = process.env.CODESANDBOX_SSE
//     ? `Add your secret key from https://liveblocks.io/dashboard/apikeys as the \`LIVEBLOCKS_SECRET_KEY\` secret in CodeSandbox.\n` +
//       `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-avatars#codesandbox.`
//     : `Create an \`.env.local\` file and add your secret key from https://liveblocks.io/dashboard/apikeys as the \`LIVEBLOCKS_SECRET_KEY\` environment variable.\n` +
//       `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-avatars#getting-started.`;

//   if (!API_KEY) {
//     console.warn(API_KEY_WARNING);
//   }

//   return { props: {} };
// }

// /**
//  * This function is used when deploying an example on liveblocks.io.
//  * You can ignore it completely if you run the example locally.
//  */
// function useExampleRoomId(roomId: string) {
//   const { query } = useRouter();
//   const exampleRoomId = useMemo(() => {
//     return query?.exampleId ? `${roomId}-${query.exampleId}` : roomId;
//   }, [query, roomId]);

//   return exampleRoomId;
// }