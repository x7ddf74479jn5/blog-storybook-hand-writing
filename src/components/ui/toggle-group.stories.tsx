import { Meta } from "@storybook/react";
import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroup>;

type Size = ToggleGroupProps["size"];
type Variant = ToggleGroupProps["variant"];
type Type = ToggleGroupProps["type"];

const SIZES = ["default", "sm", "lg"] as const satisfies Size[];
const VARIANTS = ["default", "outline"] as const satisfies Variant[];
const TYPES = ["single", "multiple"] as const satisfies Type[];

/**
 * A set of two-state buttons that can be toggled on or off.
 *
 * ## リンク
 *
 * - [shadcn/ui](https://ui.shadcn.com/docs/components/toggle-group)
 * - [Radix UI](https://www.radix-ui.com/primitives/docs/components/toggle-group)
 *
 */
const meta: Meta = {
  title: "Components/ToggleGroup",
  tags: ["autodocs"],
  args: {
    type: "multiple",
    size: "default",
    variant: "default",
    _rootAriaLabel: "Text format",
  },
  argTypes: {
    type: {
      description: "タイプ",
      type: {
        name: "string",
        required: true,
      },
      table: {
        type: {
          summary: TYPES.join("|"),
        },
        category: "Root",
      },
      control: { type: "radio" },
      options: TYPES,
    },
    size: {
      description: "サイズ",
      table: {
        type: {
          summary: SIZES.join("|"),
        },
        defaultValue: { summary: "default" },
        category: "Root",
      },
      control: { type: "radio" },
      options: SIZES,
    },
    variant: {
      description: "バリアント",
      table: {
        type: {
          summary: VARIANTS.join("|"),
        },
        defaultValue: { summary: "default" },
        category: "Root",
      },
      control: { type: "radio" },
      options: VARIANTS,
    },
    _rootDisabled: {
      name: "disabled",
      description: "非活性フラグ",
      table: {
        type: {
          summary: "boolean",
        },
        category: "Root",
      },
      control: { type: "boolean" },
    },
    _singleDefaultValue: {
      name: "defaultValue",
      description: "デフォルト値(`single`)",
      table: {
        type: {
          summary: "string",
        },
        category: "Root",
      },
      options: ["bold", "italic", "strikethrough"],
      control: { type: "radio" },
    },
    _multipleDefaultValue: {
      name: "defaultValue",
      description: "デフォルト値(`multiple`)",
      table: {
        type: {
          summary: "string[]",
        },
        category: "Root",
      },
      options: ["bold", "italic", "strikethrough"],
      control: { type: "check" },
    },
    _rootAriaLabel: {
      name: "aria-label",
      description: "アクセシビリティラベル",
      type: {
        name: "string",
        required: false,
      },
      table: {
        category: "Root",
      },
    },
    value: {
      description: "値",
      type: {
        name: "string",
        required: true,
      },
      table: {
        category: "Item",
      },
    },
    _itemDisabled: {
      name: "disabled",
      description: "非活性フラグ",
      table: {
        type: {
          summary: "boolean",
        },
        category: "Item",
      },
      control: { type: "boolean" },
    },
    _itemAriaLabel: {
      name: "aria-label",
      description: "アクセシビリティラベル",
      type: {
        name: "string",
        required: true,
      },
      table: {
        category: "Item",
      },
    },
    onValueChange: {
      description:
        "値変更時のハンドラ([API Reference](https://www.radix-ui.com/primitives/docs/components/toggle-group#root))",
      table: {
        category: "Root",
        type: {
          summary: "function",
          detail: "(value: string[]) => void",
        },
      },
    },
  },
};
export default meta;

type RootArgs = {
  size?: Size;
  variant?: Variant;
  _rootDisabled?: boolean;
  _rootAriaLabel?: string;
} & (
  | {
      type: "multiple";
      _multipleDefaultValue?: string[];
      _singleDefaultValue?: never;
    }
  | {
      type: "single";
      _multipleDefaultValue?: never;
      _singleDefaultValue?: string;
    }
);

type ItemArgs = {
  _itemDisabled?: boolean;
  _itemAriaLabel: string;
};

type Args = RootArgs & ItemArgs;

export const Default = {
  render: (args: Args) => {
    const { _itemDisabled, _itemAriaLabel, ...rest } = args;
    const {
      type,
      _multipleDefaultValue,
      _singleDefaultValue,
      _rootAriaLabel,
      _rootDisabled,
      ...rootRest
    } = rest;
    const multipleProps = {
      type: "multiple",
      defaultValue: _multipleDefaultValue,
    } as const;
    const singleProps = {
      type: "single",
      defaultValue: _singleDefaultValue,
    } as const;
    const rootProps = {
      ...rootRest,
      disabled: _rootDisabled,
      "aria-label": _rootAriaLabel,
    };
    const itemProps = { disabled: _itemDisabled, "aria-label": _itemAriaLabel };

    return (
      <ToggleGroup
        {...rootProps}
        {...(type === "multiple" ? multipleProps : singleProps)}
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" {...itemProps}>
          <Underline className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Template: React.FC<Args> = (args) => {
  const { _itemDisabled, _itemAriaLabel, ...rest } = args;
  const { _rootDisabled, _rootAriaLabel, ...rootRest } = rest;
  const rootProps = {
    ...rootRest,
    disabled: _rootDisabled,
    "aria-label": _rootAriaLabel,
  };
  const itemProps = { disabled: _itemDisabled, "aria-label": _itemAriaLabel };

  return (
    <ToggleGroup {...rootProps}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" {...itemProps}>
        <Underline className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

const renderComponent = (args: Args) => {
  const { _itemDisabled, _itemAriaLabel, ...rest } = args;
  const {
    type,
    _multipleDefaultValue,
    _singleDefaultValue,
    _rootAriaLabel,
    _rootDisabled,
    ...rootRest
  } = rest;
  const multipleProps = {
    type: "multiple",
    defaultValue: _multipleDefaultValue,
  } as const;
  const singleProps = {
    type: "single",
    defaultValue: _singleDefaultValue,
  } as const;
  const rootProps = {
    ...rootRest,
    disabled: _rootDisabled,
    "aria-label": _rootAriaLabel,
  };
  const itemProps = { disabled: _itemDisabled, "aria-label": _itemAriaLabel };

  return (
    <ToggleGroup
      {...rootProps}
      {...(type === "multiple" ? multipleProps : singleProps)}
    >
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" {...itemProps}>
        <Underline className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export const Outline = {
  render: (args: Args) => renderComponent({ ...args, variant: "outline" }),
};
