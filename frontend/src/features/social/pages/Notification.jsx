import React, { useEffect, useState } from "react";
import useSocialActions from "../hook/useSocial";

const Notification = () => {
  const { social, fetchFollowRequests, acceptFollowRequest, rejectFollowRequest } =
    useSocialActions();

  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchFollowRequests().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccept = async (username) => {
    try {
      setProcessing(`accept:${username}`);
      await acceptFollowRequest(username);
      await fetchFollowRequests();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (username) => {
    try {
      setProcessing(`reject:${username}`);
      await rejectFollowRequest(username);
      await fetchFollowRequests();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(null);
    }
  };

  const requests = social?.followRequests || [];

  return (
    <div style={{ padding: 16 }}>
      <h2>Notifications</h2>
      {requests.length === 0 && <p>No pending follow requests.</p>}
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {requests.map((r) => {
          const follower = r.follower || r.username || r;
          const isAccepting = processing === `accept:${follower}`;
          const isRejecting = processing === `reject:${follower}`;
          return (
            <div
              key={follower + (r._id || "")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 12,
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                background: "white",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{ width: 40, height: 40, borderRadius: 20, background: "#cbd5e1" }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>{follower}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>wants to follow you</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => handleAccept(follower)}
                  disabled={isAccepting || isRejecting}
                  aria-label={`Accept ${follower}`}
                  style={{ padding: "6px 12px", borderRadius: 6 }}
                >
                  {isAccepting ? "Accepting..." : "Accept"}
                </button>
                <button
                  onClick={() => handleReject(follower)}
                  disabled={isAccepting || isRejecting}
                  aria-label={`Reject ${follower}`}
                  style={{ padding: "6px 12px", borderRadius: 6 }}
                >
                  {isRejecting ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;