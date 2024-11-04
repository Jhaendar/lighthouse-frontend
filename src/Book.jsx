import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

function Book({ book }) {
  const bookTitle =
    book.attributes.title.en ||
    book.attributes.title.ja ||
    book.attributes.title.zh;
  const bookDescription =
    book.attributes.description.en ||
    book.attributes.description.ja ||
    book.attributes.description.zh;
  const bookReadChapters = book.read;
  const bookTotalChapters = book.total;

  return (
    <Card className="flex flex-col sm:flex-row w-full">
      <div className="flex-shrink-0 sm:w-[120px] p-4 m-auto">
        {/* <img
          src="/placeholder.svg?height=120&width=80"
          alt={`Cover of ${bookTitle}`}
          width={80}
          height={120}
          className="rounded-md object-cover mx-auto"
        /> */}
        <Skeleton className="h-[120px] w-full rounded-md mx-auto" />
      </div>
      <div className="flex-1 flex flex-col *:pl-1 overflow-hidden">
        <CardHeader className="">
          <div className="">
            <CardTitle className="line-clamp-1">{bookTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-2">{bookDescription}</p>
        </CardContent>
        <CardFooter className="flex-shrink-0 text-xs text-muted-foreground mt-auto">
          Progress: {bookReadChapters}/{bookTotalChapters} chapters
        </CardFooter>
      </div>
    </Card>
  );
}

export default Book;
