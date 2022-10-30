import React from "react";
import ReactAudioPlayer from "react-audio-player";

interface Props {
  title: string;
  asset: {
    _type: string;
    asset?: {
      _type: "reference";
      _ref: "string";
    };
  };
  id?: string;
}

function Player({ title, asset }: Props) {
  const ref = asset?.asset?._ref;
  const assetRefParts = ref?.split("-");
  const id = assetRefParts ? assetRefParts[1] : undefined;
  const format = assetRefParts ? assetRefParts[2] : undefined;
  const assetUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${format}`;

  const [audioEl, setAudioEl] = React.useState<HTMLAudioElement | undefined>();
  if (ref === undefined) {
    return null;
  }

  function playAudio() {
    try {
      if (!audioEl) {
        const audio = new Audio(assetUrl);
        setAudioEl(audio);
        audio.play();
      } else {
        audioEl.play();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="pt-4 space-y-3 mb-10">
      <h3 className="font-semibold text-2xl">{title}</h3>
      <ReactAudioPlayer
        id=""
        src={assetUrl}
        controls
        controlsList={"nodownload"}
      />
      <hr className="border" />
    </div>
  );
}

export default Player;
