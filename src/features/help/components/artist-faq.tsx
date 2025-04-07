import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ArtistFAQ = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">
            How do I add a song?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">To add a new song:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Go to the "Songs" section in your dashboard</li>
              <li>Click "Add Song"</li>
              <li>Fill in all song details (title, genre, album)</li>
              <li>Click "Save" to add the song to the album</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="cursor-pointer">
            Can I edit album details later?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Yes, you can edit album details after creation, but with some
              limitations:
            </p>
            <p className="mt-2">
              To edit album details, go to the "Albums" section, select the
              album, and click "Edit album".
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="cursor-pointer">
            Where can I change my password?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">To change your password:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click on your profile icon in the top-right corner</li>
              <li>Select "Settings" from the dropdown menu</li>
              <li>Go to the "Security" tab</li>
              <li>
                Under "Change Password," enter your current password and your
                new password
              </li>
              <li>Click "Update Password" to save your changes</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ArtistFAQ;
