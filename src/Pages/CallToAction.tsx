import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
const CallToAction = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
          <h2 className="text-2xl">
            Want to Know more about whats happens in the world last few days?
          </h2>
          <p className="text-gray-500 my-2">
            Checkout these resources with lates news
          </p>
          <Button className="rounded-tl-xl bg-blue-500 text-white rounded-bl-none">
            <a
              href="https://indianexpress.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Top news Headlines in India and the Worlds!
            </a>
          </Button>
        </div>
        <div className="p-7  flex-1 opacity-80">
          <img src="https://marketplace.canva.com/EAGD24-vp3M/1/0/1600w/canva-dark-blue-and-red-breaking-news-video-HNCloQ0t8M4.jpg" />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
