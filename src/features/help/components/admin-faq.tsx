import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AdminFAQ = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-add-manager">
          <AccordionTrigger className="cursor-pointer">
            How do I add a new manager?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">To add a new artist manager:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                Go to the "Users" or "Managers" section in the admin panel
              </li>
              <li>Click the "Add Manager" button</li>
              <li>
                Enter the manager’s email, name, and assign the role as{" "}
                <strong>artist_manager</strong>
              </li>
              <li>Click "Create" to finalize and invite the manager</li>
            </ol>
            <p className="mt-2">
              The manager will receive a welcome email with instructions to set
              up their account.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-manage-artists">
          <AccordionTrigger className="cursor-pointer">
            Can I manage artists as an admin?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Yes, as a super admin, you can ban, edit, or delete any artist or
              manager from the system.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">
            How do I add a new artist ?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">To add a new artist:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Navigate to the "Artists" section in your dashboard</li>
              <li>Click the "Add Artist" button in the top right</li>
              <li>Fill out the required information in the form</li>
              <li>Upload a profile photo and cover image</li>
              <li>Click "Create Artist" to finalize</li>
            </ol>
            <p className="mt-2">
              Once created, you can manage the artist's profile, releases, and
              analytics from your dashboard.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="cursor-pointer">
            How do I add a song?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">To add a new song:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Go to the "Songs" section in your dashboard</li>
              <li>Click "Add Song"</li>
              <li>Fill in all song details (title, genre, album, artist)</li>
              <li>Click "Save" to add the song to the album</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="cursor-pointer">
            What is the CSV import format for songs, and what format do I get
            when exporting?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">
              For importing songs via CSV, the required format is as follows:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Song Title</li>
              <li>Genre</li>
              <li>Song Release Date (in YYYY-MM-DD format)</li>
              <li>Album Title</li>
              <li>Artist Name</li>
              <li>Artist Email</li>
            </ol>
            <p className="mt-2">
              Ensure each song entry follows this structure for a successful
              import. Each row in the CSV file corresponds to a song with the
              required fields.
            </p>

            <p className="mt-4">
              When exporting your songs, the CSV format will include the
              following columns:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Song Title</li>
              <li>Genre</li>
              <li>Song Release Date</li>
              <li>Album Title</li>
              <li>Album Type</li>
              <li>Artist Name</li>
              <li>Artist Email</li>
            </ol>
            <p className="mt-2">
              This format allows you to easily re-import or manage your song
              library.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
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

        <AccordionItem value="item-4">
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

export default AdminFAQ;
