export const uploadImages = async (fileName) => {
    console.log("fileName", fileName);
    const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/files`,
      {
        method: "POST",
        body: fileName,
      },
      {
        next: {
          tag: ["uploadImages"],
        },
      }
    );
    const payload = res.json();
  console.log("file payload", payload)
    return payload;
  };

  // export const getFileName = async (fileName) => {
  //   const res = await fetch(
  //     `${process.env.BASE_URL_V2}/v1/file?fileName=${fileName}`,
  //     {
  //       method: "GET"
  //     },
  //     {
  //       next: {
  //         tag: ["getFileName"],
  //       },
  //     }
  //   );
  //   const data = await res.json();
  //   return data;
  // };