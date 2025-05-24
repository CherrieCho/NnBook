import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./styles/MeetingDetail.style.css";
import { useMeetingQuery } from "../../hooks/Meeting/useMeetingQuery";
import { useNavigate, useParams } from "react-router";
import { useMyInfoQuery } from "../../hooks/Common/useMyInfoQuery";
import { useDeleteMeeting } from "../../hooks/Meeting/useDeleteMeeting";
import { useAllUsersQuery } from "../../hooks/Common/useAllUserQuery";
import axiosMeetingDB from "../../utils/axiosMeetingDB";
import { useMeetingMemberQuery } from "../../hooks/Meeting/useMeetingMembers";
import { useJoinMeeting } from "../../hooks/Meeting/useJoinMeeting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useLeaveMeeting } from "../../hooks/Meeting/useLeaveMeeting";
import Loading from "../../common/Loading/Loading";
import { useSingleMeetingQuery } from "../../hooks/Meeting/useSingleMeeting";
import { Alert } from "react-bootstrap";

const MeetingDetail = () => {
  let { id } = useParams();
  const { data } = useMeetingQuery();
  const { data: meetingDetailData, isLoading, isError, error } = useSingleMeetingQuery(id);
    //글 작성자 이메일 추출
  const leader = meetingDetailData?.[0]?.leaderEmail;
  const { data: memberData } = useMeetingMemberQuery(leader, !!leader);
  const { data: userData } = useMyInfoQuery();
  const { data: allUsers } = useAllUsersQuery();
  const deleteMutation = useDeleteMeeting();
  const { mutate: leaveMeeting } = useLeaveMeeting();
  const { mutate: joinMeeting } = useJoinMeeting();
  const navigate = useNavigate();

  // console.log(meetingDetailData)
  // console.log(leader)

  const translateKorean = (location) => {
    switch (location) {
      case "seoul":
        return "서울";
        break;
      case "incheon":
        return "인천";
        break;
      case "daejeon":
        return "대전";
        break;
      case "daegu":
        return "대구";
        break;
      case "busan":
        return "부산";
        break;
      case "ulsan":
        return "울산";
        break;
      case "gwangju":
        return "광주";
        break;
      case "gyeonggi":
        return "경기";
        break;
      case "gangwon":
        return "강원";
        break;
      case "chungcheong":
        return "충청";
        break;
      case "jeolla":
        return "전라";
        break;
      case "gyeongsang":
        return "경상";
        break;
      case "jeju":
        return "제주";
        break;
    }
  };

  //게시글 삭제
  const handleDelete = (deleteId) => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      deleteMutation.mutate(deleteId);
    }
  };

  //모입 가입
  const handleJoin = () => {
    if (!userData?.email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else if (window.confirm("모임에 가입하시겠습니까?")) {
      joinMeeting({
        leaderEmail: leader,
        memberEmail: userData?.email,
      });
    }
  };

  //가입 여부 확인
  const isMember = memberData?.find(
    (member) => member.memberEmail == userData?.email
  );

  //모임 탈퇴
  const handleLeave = () => {
    if (window.confirm("정말 탈퇴 하시겠습니까?")) {
      leaveMeeting({ leaderEmail: leader, memberEmail: userData?.email });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError){
    return <Alert variant="danger">불러오기 실패: {error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <div className="meeting-detail">
            <div className="meeting-title-detail">
              <div className="meeting-join-status">
                <h1>
                  {meetingDetailData?.map((meeting) => {
                    if (meeting.id == id) {
                      return meeting.title;
                    }
                  })}
                </h1>
                {isMember ? <div>참여중</div> : ""}
              </div>
              <div className="meeting-members">
                <FontAwesomeIcon icon={faUsers} />
                <div>{`참여자 ${memberData?.length}명`}</div>
              </div>
            </div>
            <div className="meeting-detail-info">
              <p>
                작성자{" "}
                <span>
                  {meetingDetailData?.map((meeting) => {
                    if (meeting.id == id) {
                      return allUsers?.map((users) => {
                        if (users.email == meeting.leaderEmail) {
                          return users.nickname;
                        }
                      });
                    }
                  })}
                </span>
              </p>
              <div className="meeting-detail-info-loc-date">
                <p>
                  지역{" "}
                  <span>
                    {meetingDetailData?.map((meeting) => {
                      if (meeting.id == id) {
                        return translateKorean(meeting.location);
                      }
                    })}
                  </span>
                </p>
                <p>
                  일시{" "}
                  <span>
                    {meetingDetailData?.map((meeting) => {
                      if (meeting.id == id) {
                        return meeting.date.slice(0, 10);
                      }
                    })}{" "}
                    {meetingDetailData?.map((meeting) => {
                      if (meeting.id == id) {
                        return meeting.time.slice(0, 5);
                      }
                    })}
                  </span>
                </p>
              </div>
            </div>
            <div className="meeting-desc">
              <p>
                {meetingDetailData?.map((meeting) => {
                  if (meeting.id == id) {
                    return meeting.content;
                  }
                })}
              </p>
            </div>
          </div>
          <div className="join-button-box">
            {meetingDetailData?.map((meeting) => {
              //해당 게시글 작성자일 경우
              if (meeting.id == id && meeting.leaderEmail === userData?.email) {
                return (
                  <Button
                    type="button"
                    key={meeting.id}
                    size="lg"
                    onClick={() => handleDelete(meeting.id)}
                  >
                    삭제
                  </Button>
                );
              }

              //해당 게시글 작성자가 아닐 경우
              if (meeting.id == id && meeting.leaderEmail !== userData?.email) {
                if (!isMember) {
                  return (
                    <Button
                      type="button"
                      key={meeting.id}
                      size="lg"
                      onClick={handleJoin}
                    >
                      모임 참가
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      type="button"
                      key={meeting.id}
                      size="lg"
                      onClick={handleLeave}
                    >
                      모임 탈퇴
                    </Button>
                  );
                }
              }
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MeetingDetail;
