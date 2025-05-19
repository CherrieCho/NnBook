import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../../styles/MyLibraryDetail.style.css";
import useBookByID from "../../hooks/useBookbyID";
import { useParams } from "react-router";
import { useLikeBookMutation } from "../../hooks/useLikeBookMutation";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import { useLikedBooksQuery } from "../../hooks/useLikedBooks";
import { useProgressMutation } from "../../hooks/useProgressMutation";
import { useProgressDataQuery } from "../../hooks/useProgressData";

const MyLibraryDetail = () => {
  const [entries, setEntries] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [progress, setProgress] = useState(0);

  const [inputDateTime, setInputDateTime] = useState("");
  const [inputPages, setInputPages] = useState("");
  const [inputTotal, setInputTotal] = useState("");

  const [showMinusPageModal, setShowMinusPageModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showOverPageModal, setShowOverPageModal] = useState(false);
  const [showCompleteProgressBar, setShowCompleteProgressBar] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const [likeStatus, setLikeStatus] = useState(null); // 클릭 시 임시 저장

  const { bookID } = useParams();
  const numericBookID = Number(bookID);

  const { data: book, isLoading, error } = useBookByID(bookID);
  const { data: mydata } = useMyInfoQuery();
  const { data: likedBooks } = useLikedBooksQuery(); // 좋아요 목록 가져오기
  const { mutate: addProgress } = useProgressMutation();
  const {
    data: progressData,
    isLoading: progressLoading,
    error: progressError,
  } = useProgressDataQuery({ bookID: Number(bookID) });

  const isLiked = likedBooks?.some(
    (book) => Number(book.bookID) === numericBookID
  ); // 서버 기반 판단

  const { mutate: likeBook } = useLikeBookMutation();

  useEffect(() => {
    if (book && book?.subInfo?.itemPage) {
      setTotalPages(parseInt(book?.subInfo?.itemPage, 10));
    }
  }, [book]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("ko-KR", options);
  };

  //진척도 추가하기
  const handleAddEntry = () => {
    const readPages = parseInt(inputPages, 10);
    const total = totalPages > 0 ? totalPages : parseInt(inputTotal, 10);

    if (!inputDateTime) {
      alert("날짜를 선택해주세요.");
      return;
    }

    if (!readPages) {
      alert("읽은 페이지 수를 입력해주세요.");
      return;
    }

    if (!total) {
      alert("전체 페이지 수를 입력해주세요.");
      return;
    }

    const isDuplicateDate = entries.some(
      (entry) => entry.date === inputDateTime
    );

    if (isDuplicateDate) {
      alert("이미 해당 날짜에 기록이 있습니다.");
      return;
    }

    const latestDate =
      progressData?.length > 0
        ? new Date(progressData[progressData.length - 1].readAt)
        : null;
    const inputDate = new Date(inputDateTime);
    if (latestDate && inputDate < latestDate) {
      alert("기록한 날짜보다 이전 날짜는 기록할 수 없어요.");
      return;
    }

    if (readPages < 0) {
      alert("읽은 페이지 수는 1쪽 이상이어야 해요.");
      return;
    }

    //페이지 누적치(데이터에서 불러오기)
    const SumOfPages =
      progressData?.length > 0 && progressData[progressData.length - 1]?.pageSum
        ? progressData[progressData.length - 1].pageSum
        : 0;
    const newSum = SumOfPages + readPages;

    if (newSum > total) {
      alert("총 페이지 수를 초과했어요.");
      return;
    }

    const percent = Math.min(Math.round((newSum / total) * 100), 100);

    setEntries([...entries, { date: inputDateTime, pages: readPages }]);
    if (totalPages === 0) setTotalPages(total);
    setProgress(percent);

    //서버에 전송
    addProgress({
      bookID: Number(bookID),
      pageNow: readPages,
      pageSum: newSum,
      progressPercent: percent,
      readAt: inputDateTime,
    });

    if (newSum === total) {
      setShowCompleteModal(true);
      setShowCompleteProgressBar(true);
    }

    setInputDateTime("");
    setInputPages("");
  };

  //진척도 퍼센트
  const getPercent =
    Array.isArray(progressData) && progressData.length > 0
      ? progressData[progressData.length - 1].progressPercent
      : 0;

  const isTotalPagesInputDisabled =
    totalPages > 0 || (book && book?.subInfo?.itemPage);

  const handleLike = (status) => {
    if (!status) {
      setShowValidationMessage(true);
      return;
    }
    setLikeStatus(status);
    likeBook({ bookID: numericBookID });
  };

  // console.log(entries)
  // console.log("겟해온거", progressData)

  if (isLoading) return <p>로딩 중…</p>;
  if (error) return <p>오류: {error.message}</p>;
  if (progressError) return <p>진척도 정보 오류: {progressError.message}</p>;
  if (!book) return <p>책을 찾을 수 없습니다.</p>;

  return (
    <div className="libraryDetailContainer">
      <div>
        <div className="libraryDetail libraryDetailBoxStroke">
          <div className="libraryDetailBookInfo">
            <div>
              <img
                src={book.cover}
                alt={book.title ? book.title.split(" - ")[0] : ""}
              />
            </div>
            <div className="libraryDetailInfoText">
              <div>
                <h5 className="mt-2 mx-4">{book.title?.split(" - ")[0]}</h5>
                <h6 className="mt-2 mx-4">{book?.subInfo?.itemPage} 쪽</h6>
                <h6 className="mt-2 mx-4">
                  {book?.categoryName.split(">")[1]}
                </h6>
              </div>

              {isLiked !== undefined && (
                <div className="libraryDetailBoxStroke libraryDetailRAL">
                  <div className="libraryDetailLike">
                    {isLiked ? "👍 Like" : "😃 Please Rate!"}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="progress">
            <div
              className={`progress-bar progressBar ${
                showCompleteProgressBar ? "CompleteProgressBar" : ""
              }`}
              role="progressbar"
              style={{ width: `${getPercent}%` }}
              aria-valuenow={getPercent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <p className="libraryDetailProgressPercent">{getPercent}%</p>
            </div>
          </div>

          <div className="libraryDetailProgressArea libraryDetailBoxStroke">
            <div className="libraryDetailDandP">
              <h6>날짜</h6>
              <h6>진척도</h6>
            </div>

            {/* 조건부 렌더링 */}
            {progressLoading ? (
              <div className="libraryDetailProgressList">
                <p>진척도 데이터를 불러오고 있어요...</p>
              </div>
            ) : progressError ? (
              <div className="libraryDetailProgressList">
                <p className="text-danger">
                  진척도 불러오기 실패: {progressError.message}
                </p>
              </div>
            ) : (
              <div className="libraryDetailProgressList">
                <ul>
                  {progressData?.map((progress, idx) => (
                    <li key={idx}>{formatDate(progress.readAt)}</li>
                  ))}
                </ul>
                <ul>
                  {progressData?.map((progress, idx) => (
                    <li key={idx}>{progress.pageSum} 페이지</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="libraryInputArea">
          <Form.Control
            type="datetime-local"
            value={inputDateTime}
            onChange={(e) => setInputDateTime(e.target.value)}
            aria-label="날짜"
            className="libraryDetailBoxStroke libraryDetailInputCal"
            disabled={progress === 100}
          />
          <Form.Control
            type="number"
            placeholder="읽은 페이지 수"
            value={inputPages}
            onChange={(e) => setInputPages(e.target.value)}
            aria-label="읽은 페이지 수"
            className="libraryDetailBoxStroke"
            disabled={progress === 100}
          />
          <Form.Control
            type="number"
            placeholder="전체 페이지 수"
            value={totalPages > 0 ? totalPages : inputTotal}
            onChange={(e) => setInputTotal(e.target.value)}
            aria-label="전체 페이지 수"
            disabled={isTotalPagesInputDisabled || progress === 100}
            className="libraryDetailBoxStroke"
          />
          <Button
            className="libraryDetailInputButton"
            onClick={handleAddEntry}
            disabled={progress === 100}
          >
            +
          </Button>
        </div>

        <Modal
          show={showCompleteModal}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header>
            <Modal.Title>완독 축하합니다! 🎉</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>책을 끝까지 다 읽으셨네요!</p>
            {showValidationMessage && (
              <p className="text-danger mt-3">
                좋아요/싫어요 중 하나를 선택해주세요.
              </p>
            )}
            <div className="d-flex justify-content-around mt-3">
              <Button
                variant={likeStatus === "like" ? "success" : "outline-success"}
                onClick={() => handleLike("like")}
              >
                👍 Like
              </Button>
              <Button
                variant={likeStatus === "dislike" ? "danger" : "outline-danger"}
                onClick={() => handleLike("dislike")}
              >
                👎 Dislike
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => setShowCompleteModal(false)}
            >
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default MyLibraryDetail;
