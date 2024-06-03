async function* readStream(reader: ReadableStreamDefaultReader<Uint8Array>) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield { done, value };
    }
  }