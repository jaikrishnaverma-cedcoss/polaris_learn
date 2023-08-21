import { Page, Badge, LegacyCard } from "@shopify/polaris";
import React from "react";
import { MediaCardExample } from "./Comps/MediaCardExample";
import TabsExample from "./Comps/TabsExample";
import ModalExample from "./Comps/ModalExample";
import DropZoneExample from "./Comps/DropZoneExample";
import { DescriptionListExample } from "./Comps/DescriptionListExample";
import { ColorPickerExample } from "./Comps/ColorPickerExample";

const AllComp = () => {
  return (
    <Page
      backAction={{ content: "Products", url: "#" }}
      title="3/4 inch Leather pet collar"
      titleMetadata={<Badge status="success">Paid</Badge>}
      subtitle="Perfect for any pet"
      compactTitle
      primaryAction={{ content: "Save", disabled: true }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
        {
          content: "View on your store",
          onAction: () => alert("View on your store action"),
        },
      ]}
      actionGroups={[
        {
          title: "Promote",
          actions: [
            {
              content: "Share on Facebook",
              accessibilityLabel: "Individual action label",
              onAction: () => alert("Share on Facebook action"),
            },
          ],
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard title="Card" sectioned>
        <MediaCardExample />
      </LegacyCard>
      <LegacyCard title="Tabs" sectioned>
        <TabsExample />
      </LegacyCard>
      <LegacyCard title="File Upload" sectioned>
        <DropZoneExample />
      </LegacyCard>
      <LegacyCard title="Description List" sectioned>
        <DescriptionListExample />
      </LegacyCard>
      <LegacyCard title="Color Picker" sectioned>
        <ColorPickerExample />
      </LegacyCard>
      <LegacyCard title="Color Picker" sectioned>
        <ModalExample />
      </LegacyCard>
    </Page>
  );
};
export default AllComp;
