import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const hasBreakingWord = (value: string): boolean => {
  return /break(ing)?/i.test(value);
};

const hasEmoji = (value: string): boolean => {
  return /\p{Emoji_Presentation}/u.test(value);
};

const hasExclamationMark = (type: string, header: string): boolean => {
  return new RegExp(`${type}(\\(.*\\))?!:`).test(header);
};

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-conventionalcommits",
  formatter: "@commitlint/format",
  plugins: [
    {
      rules: {
        "check-breaking-change": ({ subject, body, footer, type, header }) => {
          const has_break_word_footer = hasBreakingWord(footer || "");
          const has_break_word_subject = hasBreakingWord(subject || "");
          const has_break_word_body = hasBreakingWord(body || "");
          const type_includes_exclamation_mark = hasExclamationMark(
            type || "",
            header || ""
          );

          if (
            (type_includes_exclamation_mark || has_break_word_subject) &&
            !body
          ) {
            return [
              false,
              "Breaking change requires a body — describe what changed and why",
            ];
          }

          if (
            (has_break_word_footer ||
              has_break_word_subject ||
              has_break_word_body) &&
            !type_includes_exclamation_mark
          ) {
            return [
              false,
              `Breaking change detected — use "!" after type e.g. ${type}!: ${subject}`,
            ];
          }
          return [true, ""];
        },
        "subject-check-noemoji": ({ subject }) => {
          // Custom rule implementation
          const has_emoji_subject = hasEmoji(subject || "");
          if (has_emoji_subject) {
            return [false, "subject cannot contain emojis"];
          }
          return [true, ""];
        },
      },
    },
    "commitlint-plugin-tense",
  ],
  rules: {
    // -- Throw error when emoji detects
    "subject-check-noemoji": [2, "always"],
    // -- Throw error if breaking change but not specified properly
    "check-breaking-change": [2, "always"],
    "tense/subject-tense": [2, "always"],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "feat",
        "chore",
        "fix",
        "perf",
        "test",
        "docs",
        "style",
        "build",
        "refactor",
        "ci",
      ],
    ],
    "type-case": [RuleConfigSeverity.Error, "always", ["lower-case"]],
    "header-trim": [RuleConfigSeverity.Error, "never"],
    "subject-case": [RuleConfigSeverity.Error, "always", ["lower-case"]],
    "subject-empty": [RuleConfigSeverity.Error, "never"],
    "subject-max-length": [RuleConfigSeverity.Error, "always", 70],
    "scope-case": [RuleConfigSeverity.Error, "always", ["lower-case"]],
    "scope-delimiter-style": [RuleConfigSeverity.Error, "always", [","]],
    "body-case": [RuleConfigSeverity.Error, "always", ["sentence-case"]],
    "body-leading-blank": [RuleConfigSeverity.Error, "always"],
  },

  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing",
        enum: {
          feat: {
            description: "A new feature",
            title: "Features",
            emoji: "✨",
          },
          fix: {
            description: "A bug fix",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          docs: {
            description: "Documentation only changes",
            title: "Documentation",
            emoji: "📚",
          },
          style: {
            description:
              "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
            title: "Styles",
            emoji: "💎",
          },
          refactor: {
            description:
              "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
            emoji: "📦",
          },
          perf: {
            description: "A code change that improves performance",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          test: {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
            emoji: "🚨",
          },
          build: {
            description:
              "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
            title: "Builds",
            emoji: "🛠",
          },
          ci: {
            description:
              "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: "Chores",
            emoji: "♻️",
          },
          isBreaking: {
            description: "Are there any breaking changes?",
          },
          breakingBody: {
            description:
              "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself",
          },
          breaking: {
            description: "Describe the breaking changes",
          },
        },
      },
    },
  },
};

export default Configuration;
