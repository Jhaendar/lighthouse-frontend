// React
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import BookPage from "./BookPage";

const TabNames = {
  ongoing: "Ongoing",
  priority: "Priority",
  stacking: "Stacking",
  plantToRead: "Plant to Read",
  completed: "Completed",
  onHold: "On Hold",
};

function BookStatusTab() {
  const [currentTabName, setTabName] = useState(TabNames.ongoing);

  return (
    <>
      <Tabs defaultValue={TabNames.ongoing} onValueChange={setTabName}>
        <TabsList className="flex">
          {Object.values(TabNames).map((name) => (
            <TabsTrigger key={name} value={name} className="flex-1 text-center">
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={currentTabName}>
          <BookPage tabName={currentTabName} />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}

export default BookStatusTab;
