# eng-mobile

**Summary:** Mobile Engineer builds, tests, and releases native and cross-platform mobile applications for iOS and Android, delivering high-quality user experiences on mobile devices.

**Level:** IC
**Reports to:** Engineering Manager
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Build, test, and release mobile applications on iOS and/or Android platforms following platform-specific conventions
- Implement intuitive mobile UI following platform-specific design patterns (HIG for iOS, Material Design for Android)
- Optimize app performance including launch time, UI responsiveness, memory usage, and battery consumption
- Integrate with device APIs including camera, location services, push notifications, biometrics, and sensors
- Manage end-to-end app store submission processes including TestFlight, Google Play Console, and release management
- Monitor crash reporting, diagnose regressions, and fix platform-specific issues in production
- Maintain platform-native codebases (Swift/Kotlin) and cross-platform shared logic (React Native/Flutter)
- Implement offline-first architectures with local storage, background sync, and conflict resolution
- Write automated tests at unit, integration, and UI levels using platform testing frameworks
- Participate in code reviews focusing on mobile-specific concerns (memory leaks, threading, lifecycle management)
- Contribute to mobile architecture decisions and technology stack evolution
- Collaborate with backend engineers on mobile-optimized API design, including pagination, caching headers, and payload shaping

## Core Competencies
- Native development expertise in Swift/SwiftUI for iOS and Kotlin/Jetpack Compose for Android
- Cross-platform framework experience (React Native, Flutter, or .NET MAUI)
- Deep understanding of mobile architecture patterns (MVVM, MVI, Clean Architecture, VIPER)
- Knowledge of mobile UI/UX best practices and platform-specific design conventions
- Experience with CI/CD for mobile using Fastlane, Bitrise, or GitHub Actions
- Proficiency with mobile testing frameworks (XCTest, Quick/Nimble, Espresso, Detox, Appium)
- Understanding of app store guidelines, review processes, and compliance requirements
- Knowledge of networking, offline storage, background processing, and thread management on mobile
- Familiarity with analytics, crash reporting, and performance monitoring SDKs (Firebase, Sentry, Datadog)
- Experience with dependency injection, reactive programming, and modular architecture patterns

## Tools & Technology
- iOS: Xcode, Swift, SwiftUI, UIKit, Combine, Core Data, XCTest, TestFlight
- Android: Android Studio, Kotlin, Jetpack Compose, Coroutines, Room, Espresso, Gradle
- Cross-platform: React Native, Flutter, Dart, Expo, Bloc
- CI/CD: Fastlane, Bitrise, GitHub Actions, CircleCI, TestFlight, Google Play Console
- Monitoring: Firebase Crashlytics, Sentry, Datadog, New Relic Mobile, App Center
- Networking: Apollo GraphQL, Alamofire, Retrofit, URLSession, OkHttp
- Storage: Realm, SQLite, Core Data, Room, MMKV, Firebase Firestore

## KPIs & Success Metrics
- App crash-free session rate (target: 99.5%+)
- App launch time (cold start under 2 seconds)
- App Store rating and review volume
- UI thread frame drops and jank rate (60fps target)
- Test coverage percentage across unit, integration, and UI tests
- Release cycle time from code freeze to app store approval
- User retention by app version and feature adoption rate
- Battery consumption impact per session

## Career Progression
- Junior (0-2 years): Implements UI screens under guidance, fixes bugs, writes basic unit tests
- Mid (2-4 years): Independently delivers features, manages app store releases, contributes to architecture
- Senior (4-7 years): Leads mobile feature initiatives, establishes best practices, mentors juniors
- Staff (7-10 years): Architects multi-platform mobile strategy, drives performance and quality programs
- Principal (10+ years): Company-wide mobile platform vision, influences industry through open source or talks
- Typical progression: Junior to Mid 1-2 years, Mid to Senior 2-3 years, Senior to Staff 3-4 years

## Day-to-Day Workflow
- Daily standup with the broader engineering team to discuss progress and blockers
- Sprint-based development with 1-2 week iterations and regular retrospectives
- Build and test cycles with frequent simulator/emulator runs for UI validation
- Regular interaction with QA for manual regression testing before releases
- Code reviews with attention to mobile-specific concerns (memory, threading, lifecycle)
- Weekly 1:1 with engineering manager for career and project alignment
- Release cycles every 2-4 weeks with beta distribution through TestFlight/internal channels
- Crash dashboard review at the start of each day to triage new issues

## Cross-Functional Relationships
- Partners with dsg-ui on mobile-specific UX patterns, gesture design, and platform-conformant interfaces
- Collaborates with eng-backend on mobile-optimized API design, offline sync strategies, and push notification infrastructure
- Works with prd-manager on feature prioritization, release planning, and mobile-specific requirements
- Engages with eng-qa on mobile test automation, device matrix coverage, and manual testing cycles
- Coordinates with eng-frontend on shared web views, deep linking, and cross-platform consistency
- Partners with dsg-motion on animation transitions, loading states, and micro-interactions
- Works with eng-platform on build pipeline optimization, monorepo inclusion, and CI/CD for mobile
- Engages with sls-solutions on mobile SDK integrations for partner products
- Collaborates with mkt-analytics on in-app event tracking and attribution configuration

## Regional Nuances
- NA: iOS-skilled engineers command premium compensation; strong emphasis on App Store quality standards; Swift and SwiftUI dominant
- EMEA: Higher Android market share in parts of Europe (Spain, Italy) driving demand for Kotlin engineers; GDPR compliance critical for app analytics and push notification consent
- APAC: Android dominates market share (80%+ in India, Southeast Asia); cross-platform approaches (Flutter, React Native) especially popular; aggressive app feature requirements for competitive markets
- LATAM: Growing mobile development scene; cross-platform skills valued for cost efficiency; US time zone overlap helpful for remote collaboration

## Industry Variations
- SaaS: Mobile companion apps for web platforms, enterprise mobile security (MDM), offline-first for field workers
- Fintech: Security-critical mobile banking, biometric authentication, regulatory compliance (PSD2 in EU), real-time transaction notifications
- E-commerce: Product discovery apps, AR try-on features, mobile checkout optimization, push notification retargeting, deep linking for campaigns
- Healthcare: HIPAA-compliant patient portals, telemedicine video integration, medical device connectivity, offline health data storage
- Media/Entertainment: Video streaming optimization, offline downloads, Cast/AirPlay integration, social sharing features

## Common Challenges
- Managing OS fragmentation across device models, screen sizes, and OS versions
- Balancing feature parity between iOS and Android with platform-specific development teams
- Navigating Apple and Google app store review guidelines and policy changes
- Debugging production issues that are device-specific and hard to reproduce
- Optimizing app size and performance while adding new features
- Coordinating release timing across mobile and backend teams for feature launches

## Key Regulations & Compliance
- App Store Review Guidelines (Apple) and Developer Program Policies (Google)
- GDPR for EMEA user data, analytics consent, and push notification compliance
- CCPA for California user privacy rights and data deletion requests
- COPPA for apps targeting children under 13
- HIPAA for healthcare mobile applications
- PSD2 for financial services mobile apps in Europe
- WCAG 2.1 AA for mobile accessibility requirements
