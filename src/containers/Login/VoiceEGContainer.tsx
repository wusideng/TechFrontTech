import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";

const VoiceEGContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <div>
      {/* VoiceEGContainer */}
      <a href="tel:+8618614032685">拨打客户电话（186****2685）</a>
    </div>
  );
};

export default VoiceEGContainer;
