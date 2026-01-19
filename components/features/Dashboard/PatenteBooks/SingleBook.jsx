import React from "react";
import { useParams } from "react-router-dom";
import LoaderCircleWithBar from "../../../Shared/Components/LoaderCircleWithBar";
import Container from "../../../Shared/Container/Container";
import useGetSingleBook from "../../../Util/Hooks/useGetSingleBook";
import usePContext from "../../../Util/Hooks/usePContext";
import AddPages from "./AddPages";

const SingleBook = () => {
  const { id } = useParams();
  const { singleBook, isLoading, refetch } = useGetSingleBook(id);
  const { title, description, _id, coverImage, pages } = singleBook;
  const { loggedUser } = usePContext();

  return (
    <div className="py-10">
      <Container>
        {loggedUser?.role === "Admin" && (
          <AddPages refetch={refetch} bookId={_id} />
        )}

        {!isLoading ? (
          <>
            <h1 className="text-4xl my-5 text-center">{title}</h1>
            <div>
              {pages?.map((page, index) => (
                <img
                  draggable="false"
                  key={index}
                  className="mx-auto mb-10"
                  src={page.pageImage}
                />
              ))}
            </div>
          </>
        ) : (
          <LoaderCircleWithBar />
        )}
      </Container>
    </div>
  );
};

export default SingleBook;
