import React from "react";

interface PlayerViewProps {
  ign: string;
}

const PlayerView: React.FC<PlayerViewProps> = ({ ign }) => {
  return <div>{ign}</div>;
};

export function RoutedPlayerView(props: any) {
  const ign: string = props.match.params.ign;

  return <PlayerView ign={ign} />;
}
