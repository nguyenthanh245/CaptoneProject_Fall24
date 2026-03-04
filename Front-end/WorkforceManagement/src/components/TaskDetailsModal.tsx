import React, { useState } from "react";
import {
  Modal,
  Typography,
  Descriptions,
  Button,
  Space,
  Card,
  Input,
} from "antd";
import {
  reviewAndApproveTask,
  TAssignmentHistoryData,
} from "../services/leader-api";
import { toast } from "sonner";

interface TaskDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  taskId: number;
  taskDataSelected: TAssignmentHistoryData;
  refetch: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isVisible,
  onClose,
  taskDataSelected,
  refetch,
}) => {
  const [comment, setComment] = useState<string>("");
  const handleReview = async () => {
    try {
      await reviewAndApproveTask({
        taskId: taskDataSelected.task.taskId,
        isApproved: true,
        leaderComment: comment,
      });
      onClose();
      refetch();
      toast.success("Review Task Success !");
    } catch (error) {
      onClose();
      toast.error(error as string);
    }
  };

  const handleReject = async () => {
    try {
      await reviewAndApproveTask({
        taskId: taskDataSelected.task.taskId,
        isApproved: false,
        leaderComment: comment,
      });
      onClose();
      refetch();
      toast.success("Review Task Success !");
    } catch (error) {
      onClose();
      toast.error(error as string);
    }
  };

  return (
    <Modal
      title={
        <Typography.Title
          level={3} // Adjust title size; level 3 is larger than the default
          style={{
            margin: 0,
            fontSize: "24px", // Explicitly set a larger font size
            fontWeight: "bold", // Make it bold for emphasis
          }}
        >
          Task Report
        </Typography.Title>
      }
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width="70%"
      centered
      bodyStyle={{
        maxHeight: "80vh", // Limit the height to 80% of the viewport
        overflowY: "auto", // Enable vertical scrolling
        padding: "24px",
      }}
    >
      <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ flex: 2 }}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Task ID">
              {taskDataSelected?.task.taskId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Project ID">
              {taskDataSelected?.task.vulnerability.projectId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Project Name">
              {taskDataSelected?.task.vulnerability.projectName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Vulnerability ID">
              {taskDataSelected?.task.vulnerability.vulnerabilityId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Vulnerability Name">
              {taskDataSelected?.task.vulnerability.vulnerabilityName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Assigned At">
              {taskDataSelected.task.assignedAt
                ? new Date(taskDataSelected.task.assignedAt).toLocaleString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false, // Đặt thành `true` nếu muốn sử dụng định dạng 12 giờ
                    }
                  )
                : "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Pentester Name">
              {taskDataSelected?.task.assignedToName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Action Reason">
              {taskDataSelected?.task.actionReason || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {taskDataSelected.task.updatedAt
                ? new Date(taskDataSelected.task.updatedAt).toLocaleString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false, // Đặt thành `true` nếu muốn sử dụng định dạng 12 giờ
                    }
                  )
                : "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {taskDataSelected?.task.statusName || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </div>

        {/* Right Section: Evidence */}
        <div style={{ flex: 1 }}>
          <Card
            title={
              <Typography.Title level={5} style={{ margin: 0 }}>
                Evidence Image
              </Typography.Title>
            }
            bordered
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            {taskDataSelected?.task.imageUrl ? (
              <img
                src={`http://localhost:5173${taskDataSelected?.task.imageUrl}`}
                alt="Evidence"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Typography.Text type="secondary">
                No Evidence Available
              </Typography.Text>
            )}
          </Card>
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <Typography.Title level={5}>Leader Comment</Typography.Title>
        <Input.TextArea
          rows={4}
          placeholder="Enter your comment here before accepting or rejecting."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Footer Buttons */}
      <div style={{ marginTop: "24px", textAlign: "right" }}>
        <Space>
          <Button type="primary" className="py-4" onClick={handleReview}>
            Accept Report
          </Button>
          <Button
            type="primary"
            className="py-4 bg-[#ff4d4d]"
            danger
            onClick={handleReject}
          >
            Reject
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;
