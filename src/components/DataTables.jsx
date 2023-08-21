import {
    Badge,
    Card,
    ChoiceList,
    IndexFilters,
    IndexTable,
    Page,
    useIndexResourceState,
    useSetIndexFiltersMode,
  } from "@shopify/polaris";
  import { useCallback, useState } from "react";
  import { HeadingFormat } from "../staticData/initialData";
  
  // This example is for guidance purposes. Copying it will come with caveats.
  export function DataTables({dataSource, title}) {
  
    function disambiguateLabel(key, value) {
      switch (key) {
        case "type":
          return value.map((val) => `type: ${val}`).join(", ");
        case "status":
          return value.map((val) => `status: ${val}`).join(", ");
        default:
          return value;
      }
    }
    function isEmpty(value) {
      if (Array.isArray(value)) {
        return value.length === 0;
      } else {
        return value === "" || value == null;
      }
    }
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const [itemStrings, setItemStrings] = useState([
      "All",
      "Active",
      "Draft",
      "Archived",
    ]);
    const deleteView = (index) => {
      const newItemStrings = [...itemStrings];
      newItemStrings.splice(index, 1);
      setItemStrings(newItemStrings);
      setSelected(0);
    };
    const duplicateView = async (name) => {
      setItemStrings([...itemStrings, name]);
      setSelected(itemStrings.length);
      await sleep(1);
      return true;
    };
    const tabs = itemStrings.map((item, index) => ({
      content: item,
      index,
      onAction: () => {},
      id: `${item}-${index}`,
      isLocked: index === 0,
      actions:
        index === 0
          ? []
          : [
              {
                type: "rename",
                onAction: () => {},
                onPrimaryAction: async (value) => {
                  const newItemsStrings = tabs.map((item, idx) => {
                    if (idx === index) {
                      return value;
                    }
                    return item.content;
                  });
                  await sleep(1);
                  setItemStrings(newItemsStrings);
                  return true;
                },
              },
              {
                type: "duplicate",
                onPrimaryAction: async (name) => {
                  await sleep(1);
                  duplicateView(name);
                  return true;
                },
              },
              {
                type: "edit",
              },
              {
                type: "delete",
                onPrimaryAction: async () => {
                  await sleep(1);
                  deleteView(index);
                  return true;
                },
              },
            ],
    }));
    const [selected, setSelected] = useState(0);
    const onCreateNewView = async (value) => {
      await sleep(500);
      setItemStrings([...itemStrings, value]);
      setSelected(itemStrings.length);
      return true;
    };
    const sortOptions = [
      { label: "Product", value: "product asc", directionLabel: "Ascending" },
      { label: "Product", value: "product desc", directionLabel: "Descending" },
      { label: "Status", value: "status asc", directionLabel: "A-Z" },
      { label: "Status", value: "status desc", directionLabel: "Z-A" },
      { label: "Type", value: "type asc", directionLabel: "A-Z" },
      { label: "Type", value: "type desc", directionLabel: "Z-A" },
      { label: "Vendor", value: "vendor asc", directionLabel: "Ascending" },
      { label: "Vendor", value: "vendor desc", directionLabel: "Descending" },
    ];
    const [sortSelected, setSortSelected] = useState(["product asc"]);
    const { mode, setMode } = useSetIndexFiltersMode();
    const onHandleCancel = () => {};
    const onHandleSave = async () => {
      await sleep(1);
      return true;
    };
    const primaryAction =
      selected === 0
        ? {
            type: "save-as",
            onAction: onCreateNewView,
            disabled: false,
            loading: false,
          }
        : {
            type: "save",
            onAction: onHandleSave,
            disabled: false,
            loading: false,
          };
    const [status, setStatus] = useState(undefined);
    const [type, setType] = useState(undefined);
    const [queryValue, setQueryValue] = useState("");
    const handleStatusChange = useCallback((value) => setStatus(value), []);
    const handleTypeChange = useCallback((value) => setType(value), []);
    const handleFiltersQueryChange = useCallback(
      (value) => setQueryValue(value),
      []
    );
    const handleStatusRemove = useCallback(() => setStatus(undefined), []);
    const handleTypeRemove = useCallback(() => setType(undefined), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
    const handleFiltersClearAll = useCallback(() => {
      handleStatusRemove();
      handleTypeRemove();
      handleQueryValueRemove();
    }, [handleStatusRemove, handleQueryValueRemove, handleTypeRemove]);
    const filters = [
      {
        key: "status",
        label: "Status",
        filter: (
          <ChoiceList
            title="status"
            titleHidden
            choices={[
              { label: "Active", value: "active" },
              { label: "Draft", value: "draft" },
              { label: "Archived", value: "archived" },
            ]}
            selected={status || []}
            onChange={handleStatusChange}
            allowMultiple
          />
        ),
        shortcut: true,
      },
      {
        key: "type",
        label: "Type",
        filter: (
          <ChoiceList
            title="Type"
            titleHidden
            choices={[
              { label: "Brew Gear", value: "brew-gear" },
              { label: "Brew Merch", value: "brew-merch" },
            ]}
            selected={type || []}
            onChange={handleTypeChange}
            allowMultiple
          />
        ),
        shortcut: true,
      },
    ];
    const appliedFilters = [];
    if (status && !isEmpty(status)) {
      const key = "status";
      appliedFilters.push({
        key,
        label: disambiguateLabel(key, status),
        onRemove: handleStatusRemove,
      });
    }
    if (type && !isEmpty(type)) {
      const key = "type";
      appliedFilters.push({
        key,
        label: disambiguateLabel(key, type),
        onRemove: handleTypeRemove,
      });
    }

    const resourceName = {
      singular: title,
      plural: title+"s",
    };
    const { selectedResources, allResourcesSelected, handleSelectionChange } =
      useIndexResourceState(dataSource);
    const rowMarkup = dataSource.map((row, index) => (
      <IndexTable.Row
        id={row.id}
        key={row.id}
        selected={selectedResources.includes(row.id)}
        position={index}
      >
        {Object.entries(row).map(([key, val]) => (
          <IndexTable.Cell>{val}</IndexTable.Cell>
        ))}
      </IndexTable.Row>
    ));
    return (
      <Page
        title={HeadingFormat(title)}
        primaryAction={{ content: "Add product" }}
        secondaryActions={[
          {
            content: "Export",
            accessibilityLabel: "Export product list",
            onAction: () => alert("Export action"),
          },
          {
            content: "Import",
            accessibilityLabel: "Import product list",
            onAction: () => alert("Import action"),
          },
        ]}
      >
        <Card padding="0">
          
          <IndexFilters
            sortOptions={sortOptions}
            sortSelected={sortSelected}
            queryValue={queryValue}
            queryPlaceholder="Searching in all"
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={() => {}}
            onSort={setSortSelected}
            primaryAction={primaryAction}
            cancelAction={{
              onAction: onHandleCancel,
              disabled: false,
              loading: false,
            }}
            tabs={tabs}
            selected={selected}
            onSelect={setSelected}
            canCreateNewView
            onCreateNewView={onCreateNewView}
            filters={filters}
            appliedFilters={appliedFilters}
            onClearAll={handleFiltersClearAll}
            mode={mode}
            setMode={setMode}
          />
          <IndexTable
            resourceName={resourceName}
            itemCount={dataSource.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            sortable={[false, true, true, true, true, true, true]}
            headings={Object.entries(dataSource[0]).map(([key, val]) => {
              return { title: HeadingFormat(key)};
            })}
          >
            {rowMarkup}
          </IndexTable>
        </Card>
      </Page>
    );
  }
  