import { Card, Tag, Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";

type StatusCardProps = {
  title: string;
  loading: boolean;
  ok: boolean;
  detail: string;
};

export function StatusCard({ title, loading, ok, detail }: StatusCardProps) {
  return (
    <Card
      className="bg-surface border-border"
      styles={{ body: { padding: "1.5rem" } }}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="m-0 text-[1.2rem]">{title}</h2>
        {loading ? (
          <Tag icon={<Spin indicator={<LoadingOutlined />} size="small" />} color="warning">
            Checking
          </Tag>
        ) : ok ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Online
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Error
          </Tag>
        )}
      </div>
      <p className="mt-4 mb-0 text-foreground-muted leading-relaxed">{detail}</p>
    </Card>
  );
}
