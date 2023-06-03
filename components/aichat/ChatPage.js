'use client'

import { Chat } from './Chat'
import { COOKIE_NAME } from './config'
import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export function ChatPage() {
  const [fpHash, setFpHash] = useState('');

  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load();

      const { visitorId } = await fp.get();
      setFpHash(visitorId);
    };

    setFp();
  }, []);
  return (
    <main className="flex flex-col align-center gap-4  pt-6">

      <section className="flex items-center flex-col gap-3 ">
        <div className=" overflow-x-auto pr-2">
          <Chat fpHash={fpHash} />
        </div>
      </section>
    </main>
  )
}
